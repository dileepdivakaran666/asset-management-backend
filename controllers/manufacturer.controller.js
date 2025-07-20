// controllers/manufacturer.controller.js
const manufacturerService = require('../services/manufacturer.service');

exports.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await manufacturerService.getAll();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getOneManufacturer = async (req, res) => {
  try {
    const manufacturer = await manufacturerService.getOne(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manufacturer', error: error.message });
  }
}

exports.createManufacturer = async (req, res) => {
  try {
    const newManufacturer = await manufacturerService.create(req.body);
    res.status(201).json(newManufacturer);
  } catch (error) {
    res.status(400).json({ message: 'Creation Failed', error });
  }
};

exports.updateManufacturer = async (req, res) => {
  try {
    const updated = await manufacturerService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error });
  }
};

exports.deleteManufacturer = async (req, res) => {
  try {
    await manufacturerService.remove(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Delete Failed', error });
  }
};
