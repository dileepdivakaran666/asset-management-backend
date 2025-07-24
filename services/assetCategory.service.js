// services/assetCategory.service.js
const AssetCategory = require('../models/AssetCategory');
const AssetSubcategory = require('../models/AssetSubcategory');

exports.getAll = async () => {
  return await AssetCategory.find().sort({ createdAt: -1 });
};

exports.getOne = async (id) => {
  return await AssetCategory.findById(id); 
}

exports.create = async (data) => {
  const newCategory = new AssetCategory(data);
  return await newCategory.save();
};

exports.update = async (id, data) => {
  return await AssetCategory.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  // 1. Delete the main category
  const deletedCategory = await AssetCategory.findByIdAndDelete(id);

  // 2. If the category was found and deleted, delete its subcategories
  if (deletedCategory) {
    await AssetSubcategory.deleteMany({ categoryId: id });
  }

  return deletedCategory;
};
