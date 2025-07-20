const grnService = require('../services/grn.service');

exports.createGRN = async (req, res) => {
  const { grnData, lineItems } = req.body;
  const status = req.query.status === 'draft' ? 'draft' : 'submitted';
  console.log('createGrN', grnData, status, lineItems);

  try {
    const grn = await grnService.createGRN(grnData, lineItems, status);
    res.status(201).json(grn);
  } catch (error) {
    console.log('Error creating GRN:', error);
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

exports.getLineItems = async (req, res) => {
  try {
    const lineItems = await grnService.getLineItemsByGrnId(req.params.grnId);
    res.status(200).json(lineItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch line items', error });
  }
};

// controllers/grn.controller.js
exports.updateGRN = async (req, res) => {
  try {
    const { grnData, lineItems } = req.body;
    const result = await grnService.updateGRN(req.params.grnId, grnData, lineItems);
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
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=GRN_Register.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export GRNs', error });
  }
};


exports.exportAssetSummary = async (req, res) => {
  try {
    const buffer = await grnService.exportAssetSummaryReport();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Asset_Summary_Report.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export summary report', error });
  }
};
