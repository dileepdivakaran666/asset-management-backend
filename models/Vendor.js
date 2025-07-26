// models/Vendor.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    gstNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
