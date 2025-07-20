// controllers/assetCategory.controller.js
const assetCategoryService = require('../services/assetCategory.service');

exports.getAssetCategories = async (req, res) => {
  try {
    const categories = await assetCategoryService.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getOneAssetCategory = async (req, res) => {
  try { 
    const category = await assetCategoryService.getOne(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
   }
catch(err){
    res.status(500).json({ message: 'Error fetching category', error: err.message });
}
} 

exports.createAssetCategory = async (req, res) => {
  try {
    const newCategory = await assetCategoryService.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Creation Failed', error });
  }
};

exports.updateAssetCategory = async (req, res) => {
  try {
    const updated = await assetCategoryService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error });
  }
};

exports.deleteAssetCategory = async (req, res) => {
  try {
    await assetCategoryService.remove(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Delete Failed', error });
  }
};
