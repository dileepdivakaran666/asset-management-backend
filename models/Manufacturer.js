// models/Manufacturer.js
const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
