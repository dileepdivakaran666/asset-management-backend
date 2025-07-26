const mongoose = require('mongoose');

const assetSubcategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssetCategory',
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssetSubcategory', assetSubcategorySchema);
