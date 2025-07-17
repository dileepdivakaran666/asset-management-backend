const subcategoryService = require('../services/assetSubcategory.service');

exports.getAssetSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAll();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.createAssetSubcategory = async (req, res) => {
  try {
    const newSubcategory = await subcategoryService.create(req.body);
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(400).json({ message: 'Creation Failed', error });
  }
};

exports.updateAssetSubcategory = async (req, res) => {
  try {
    const updated = await subcategoryService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error });
  }
};

exports.deleteAssetSubcategory = async (req, res) => {
  try {
    await subcategoryService.remove(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Delete Failed', error });
  }
};
