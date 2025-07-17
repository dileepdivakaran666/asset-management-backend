// services/branch.service.js
const Branch = require('../models/Branch');

exports.getAll = async () => {
  return await Branch.find().sort({ createdAt: -1 });
};

exports.create = async (data) => {
  const branch = new Branch(data);
  return await branch.save();
};

exports.update = async (id, data) => {
  return await Branch.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Branch.findByIdAndDelete(id);
};
