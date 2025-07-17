// controllers/vendor.controller.js
const vendorService = require('../services/vendor.service');

exports.getVendors = async (req, res) => {
  try {
    const vendors = await vendorService.getAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const newVendor = await vendorService.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ message: 'Creation Failed', error });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const updated = await vendorService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    await vendorService.remove(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Delete Failed', error });
  }
};
