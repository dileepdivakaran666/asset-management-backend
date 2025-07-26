// controllers/branch.controller.js
const branchService = require('../services/branch.service');

exports.getBranches = async (req, res) => {
  try {
    const branches = await branchService.getAll();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getOneBranch = async (req, res) => {
  try {
    const branch = await branchService.getOne(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branch', error: error.message });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const newBranch = await branchService.create(req.body);
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(400).json({ message: 'Creation Failed', error });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const updated = await branchService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    await branchService.remove(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Delete Failed', error });
  }
};
