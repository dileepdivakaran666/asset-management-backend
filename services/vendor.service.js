// services/vendor.service.js
const Vendor = require('../models/Vendor');

exports.getAll = async () => {
  return await Vendor.find().sort({ createdAt: -1 });
};
exports.getOne = async (id) => {
  return await Vendor.findById(id);
};

exports.create = async (data) => {
  const vendor = new Vendor(data);
  return await vendor.save();
};

exports.update = async (id, data) => {
  return await Vendor.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Vendor.findByIdAndDelete(id);
};
