// routes/assetCategory.route.js
const express = require('express');
const router = express.Router();
const {
  getAssetCategories,
  getOneAssetCategory,
  createAssetCategory,
  updateAssetCategory,
  deleteAssetCategory,
} = require('../controllers/assetCategory.controller');

// CRUD routes
router.get('/', getAssetCategories);
router.get('/:id', getOneAssetCategory);
router.post('/', createAssetCategory);
router.put('/:id', updateAssetCategory);
router.delete('/:id', deleteAssetCategory);

module.exports = router;
