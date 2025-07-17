const mongoose = require('mongoose');

const grnLineItemSchema = new mongoose.Schema(
  {
    grnId: { type: mongoose.Schema.Types.ObjectId, ref: 'GRNHeader', required: true },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetSubcategory', required: true },
    itemDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    taxPercent: { type: Number, default: 0 },
    taxableValue: { type: Number },
    totalAmount: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GRNLineItem', grnLineItemSchema);
