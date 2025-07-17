const GRNHeader = require('../models/GRNHeader');
const GRNLineItem = require('../models/GRNLineItem');

const generateGrnNumber = async () => {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const count = await GRNHeader.countDocuments({ grnNumber: new RegExp(`^GRN-${yearMonth}`) });
  return `GRN-${yearMonth}-${String(count + 1).padStart(3, '0')}`;
};

exports.createGRN = async ({ grnData, lineItems }) => {
  const grnNumber = await generateGrnNumber();
  const grnHeader = await GRNHeader.create({ ...grnData, grnNumber });

  const items = lineItems.map((item) => {
    const taxableValue = item.quantity * item.unitPrice;
    const totalAmount = taxableValue + (taxableValue * (item.taxPercent || 0)) / 100;

    return {
      ...item,
      grnId: grnHeader._id,
      taxableValue,
      totalAmount
    };
  });

  const createdLineItems = await GRNLineItem.insertMany(items);
  return { grnHeader, lineItems: createdLineItems };
};

exports.getAllGRNs = async () => {
  return await GRNHeader.find()
    .populate('vendorId')
    .populate('branchId')
    .sort({ createdAt: -1 });
};

exports.getLineItemsByGrnId = async (grnId) => {
  return await GRNLineItem.find({ grnId }).populate('subcategoryId');
};
