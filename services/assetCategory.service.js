// services/assetCategory.service.js
const AssetCategory = require('../models/AssetCategory');

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
  return await AssetCategory.findByIdAndDelete(id);
};
