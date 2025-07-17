const grnService = require('../services/grn.service');

exports.createGRN = async (req, res) => {
  try {
    const { grnData, lineItems } = req.body;
    const result = await grnService.createGRN({ grnData, lineItems });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create GRN', error });
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
