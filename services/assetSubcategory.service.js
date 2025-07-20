const AssetSubcategory = require('../models/AssetSubcategory');

exports.getAll = async () => {
  const result = await AssetSubcategory.find().populate('categoryId'); 
  return result;
};

exports.getOne = async (id) => {
  return await AssetSubcategory.findById(id).populate('categoryId');
}

exports.create = async (data) => {
  const subcat = new AssetSubcategory(data);
  return await subcat.save();
};

exports.update = async (id, data) => {
  return await AssetSubcategory.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await AssetSubcategory.findByIdAndDelete(id);
};
