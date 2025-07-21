const mongoose = require('mongoose');

const grnHeaderSchema = new mongoose.Schema(
  {
    grnNumber: { type: String, required: true, unique: true },
    grnDate: { type: Date, required: true },
    invoiceNumber: { type: String, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    status: { type: String, enum: ['draft', 'submitted'], default: 'draft' },
    grandTotal: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GRNHeader', grnHeaderSchema);
