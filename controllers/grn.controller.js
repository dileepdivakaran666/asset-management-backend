const grnService = require('../services/grn.service');

exports.createGRN = async (req, res) => {
  const { grnData, lineItems } = req.body;
  const status = req.query.status === 'draft' ? 'draft' : 'submitted';

  try {
    const grn = await grnService.createGRN(grnData, lineItems, status);
    res.status(201).json(grn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGRNs = async (req, res) => {
  try {
    const grns = await grnService.getAllGRNs();
    res.status(200).json(grns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch GRNs', error });
  }
};

exports.getOneGrn = async (req, res) => {
  try {
    const grn = await grnService.getOneGRN(req.params.id);
    if (!grn) {
      return res.status(404).json({ message: 'GRN not found' });
    }
    res.status(200).json(grn);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch GRN', error });
  }
};

// exports.getLineItems = async (req, res) => {
//   try {
//     const lineItems = await grnService.getLineItemsByGrnId(req.params.grnId);
//     res.status(200).json(lineItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch line items', error });
//   }
// };

// controllers/grn.controller.js
exports.updateGRN = async (req, res) => {
  try {
    const { grnData, lineItems } = req.body;
    const result = await grnService.updateGRN(req.params.id, grnData, lineItems);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update GRN', error });
  }
};

exports.deleteGRN = async (req, res) => {
  try {
    await grnService.deleteGRN(req.params.grnId);
    res.status(200).json({ message: 'GRN deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete GRN', error });
  }
};

// controllers/grn.controller.js
exports.exportGRNs = async (req, res) => {
  try {
    const buffer = await grnService.exportGRNsToExcel();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=GRN_Register.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export GRNs', error });
  }
};

exports.exportAssetSummary = async (req, res) => {
  try {
    const buffer = await grnService.exportAssetSummaryReport();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Asset_Summary_Report.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export summary report', error });
  }
};

// exports.getGRNReport = async (req, res) => {
//   try {
//     const result = await grnService.fetchGRNReport(req.query);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.exportGRNReport = async (req, res) => {
//   try {
//     const filters = req.query;
//     const grns = await grnService.fetchGRNReport(filters);

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('GRN Report');

//     worksheet.columns = [
//       { header: 'GRN Number', key: 'grnNumber', width: 15 },
//       { header: 'GRN Date', key: 'grnDate', width: 15 },
//       { header: 'Invoice Number', key: 'invoiceNumber', width: 20 },
//       { header: 'Vendor Name', key: 'vendor', width: 20 },
//       { header: 'Branch', key: 'branch', width: 20 },
//       { header: 'Total Amount', key: 'totalAmount', width: 15 },
//     ];

//     grns.forEach((grn) => {
//       worksheet.addRow({
//         grnNumber: grn.grnNumber,
//         grnDate: new Date(grn.grnDate).toLocaleDateString(),
//         invoiceNumber: grn.invoiceNumber,
//         vendor: grn.vendorId?.name,
//         branch: grn.branchId?.name,
//         totalAmount: grn.totalAmount,
//       });
//     });

//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );
//     res.setHeader('Content-Disposition', 'attachment; filename=GRN_Report.xlsx');

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error('Export Error:', err);
//     res.status(500).json({ message: 'Failed to export GRN report' });
//   }
// };
