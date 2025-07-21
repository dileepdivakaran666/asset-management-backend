const GRNHeader = require('../models/GRNHeader');
const GRNLineItem = require('../models/GRNLineItem');
const ExcelJS = require('exceljs');
const Vendor = require('../models/Vendor');
const Branch = require('../models/Branch');

// const generateGrnNumber = async () => {
//   const now = new Date();
//   const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
//   const count = await GRNHeader.countDocuments({ grnNumber: new RegExp(`^GRN-${yearMonth}`) });
//   return `GRN-${yearMonth}-${String(count + 1).padStart(3, '0')}`;
// };

exports.createGRN = async (grnData, lineItems, status) => {
  grnData.status = status;
  // grnData.grnNumber = await generateGrnNumber();

  const grnHeader = await GRNHeader.create(grnData);
  const items = lineItems.map(item => ({ ...item, grnId: grnHeader._id }));
  await GRNLineItem.insertMany(items);

  return { grnHeader, lineItems: items };
};

exports.getAllGRNs = async () => {
  return await GRNHeader.find()
    .populate('vendorId')
    .populate('branchId')
    .sort({ createdAt: -1 });
};

exports.getOneGRN = async (id) => {
  const GRNHeaderResult = await GRNHeader.findById(id)
      .populate('vendorId')
      .populate('branchId');
    
    if (!GRNHeaderResult) {
      return null; // or throw new Error('GRN not found');
    }

    const GRNLineItems = await GRNLineItem.find({ grnId: id }).populate('subcategoryId');
   
    const grn = GRNHeaderResult.toObject();
    grn.lineItems = GRNLineItems;
    
    return grn;
};

exports.getLineItemsByGrnId = async (grnId) => {
  return await GRNLineItem.find({ grnId }).populate('subcategoryId');
};

// UPDATE GRN
exports.updateGRN = async (grnId, grnData, lineItems) => {
  // 1. Update header
  const updatedHeader = await GRNHeader.findByIdAndUpdate(grnId, grnData, { new: true });

  // 2. Remove existing line items
  await GRNLineItem.deleteMany({ grnId });

  // 3. Insert updated line items
  const newItems = lineItems.map((item) => {
    const taxableValue = item.quantity * item.unitPrice;
    const totalAmount = taxableValue + (taxableValue * (item.taxPercent || 0)) / 100;
    return {
      ...item,
      grnId,
      taxableValue,
      totalAmount
    };
  });

  const insertedItems = await GRNLineItem.insertMany(newItems);

  return { grnHeader: updatedHeader, lineItems: insertedItems };
};

// DELETE GRN
exports.deleteGRN = async (grnId) => {
  await GRNLineItem.deleteMany({ grnId });
  await GRNHeader.findByIdAndDelete(grnId);
  return true;
};

exports.exportGRNsToExcel = async () => {
  const grns = await GRNHeader.find()
    .populate('vendorId')
    .populate('branchId')
    .sort({ createdAt: -1 });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('GRN Register');

  // Header row
  worksheet.columns = [
    { header: 'GRN Number', key: 'grnNumber', width: 20 },
    { header: 'GRN Date', key: 'grnDate', width: 15 },
    { header: 'Invoice Number', key: 'invoiceNumber', width: 20 },
    { header: 'Vendor Name', key: 'vendorName', width: 30 },
    { header: 'Branch', key: 'branchName', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Created At', key: 'createdAt', width: 25 }
  ];

  // Fill data rows
  grns.forEach(grn => {
    worksheet.addRow({
      grnNumber: grn.grnNumber,
      grnDate: grn.grnDate.toISOString().split('T')[0],
      invoiceNumber: grn.invoiceNumber,
      vendorName: grn.vendorId?.name || 'N/A',
      branchName: grn.branchId?.name || 'N/A',
      status: grn.status,
      createdAt: grn.createdAt.toISOString()
    });
  });

  // Auto filter
  worksheet.autoFilter = 'A1:G1';

  // Return buffer to controller
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

exports.exportAssetSummaryReport = async () => {
  // Aggregate GRN Line Items → Category + Branch + Count
  const result = await GRNLineItem.aggregate([
    {
      $lookup: {
        from: 'grnheaders',
        localField: 'grnId',
        foreignField: '_id',
        as: 'grnHeader'
      }
    },
    { $unwind: '$grnHeader' },
    {
      $lookup: {
        from: 'assetsubcategories',
        localField: 'subcategoryId',
        foreignField: '_id',
        as: 'subcategory'
      }
    },
    { $unwind: '$subcategory' },
    {
      $lookup: {
        from: 'assetcategories',
        localField: 'subcategory.categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
    { $unwind: '$category' },
    {
      $lookup: {
        from: 'branches',
        localField: 'grnHeader.branchId',
        foreignField: '_id',
        as: 'branch'
      }
    },
    { $unwind: '$branch' },
    {
      $group: {
        _id: {
          category: '$category.name',
          branch: '$branch.name'
        },
        assetCount: { $sum: '$quantity' }
      }
    },
    {
      $project: {
        _id: 0,
        category: '$_id.category',
        branch: '$_id.branch',
        assetCount: 1
      }
    },
    { $sort: { category: 1, branch: 1 } }
  ]);

  // Generate Excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Asset Summary');

  worksheet.columns = [
    { header: 'Category Name', key: 'category', width: 30 },
    { header: 'Branch Name', key: 'branch', width: 30 },
    { header: 'Asset Count', key: 'assetCount', width: 15 }
  ];

  result.forEach(row => {
    worksheet.addRow(row);
  });

  worksheet.autoFilter = 'A1:C1';

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

exports.fetchGRNReport = async (filters) => {
  const { from, to, vendor, branch } = filters;

  const query = {};

  // Date Range
  if (from && to) {
    query.grnDate = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  }

  // Vendor Filter
  if (vendor) {
    query.vendorId = vendor;
  }

  // Branch Filter
  if (branch) {
    query.branchId = branch;
  }

  const grns = await GRNHeader.find(query)
    .populate("vendorId")
    .populate("branchId")
    .sort({ grnDate: -1 });

  return grns;
};