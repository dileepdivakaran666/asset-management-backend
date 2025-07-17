// services/manufacturer.service.js
const Manufacturer = require('../models/Manufacturer');

exports.getAll = async () => {
  return await Manufacturer.find().sort({ createdAt: -1 });
};

exports.create = async (data) => {
  const manufacturer = new Manufacturer(data);
  return await manufacturer.save();
};

exports.update = async (id, data) => {
  return await Manufacturer.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Manufacturer.findByIdAndDelete(id);
};
