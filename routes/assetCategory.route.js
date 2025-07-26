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
const { validateAssetCategory, validateIdParam } = require('../validators/assetCategory.validator');
const validate = require('../middlewares/validate');

// CRUD routes
router.get('/', getAssetCategories);
router.get('/:id', validateIdParam, validate, getOneAssetCategory);
router.post('/', validateAssetCategory, validate, createAssetCategory);
router.put('/:id', validateIdParam, validate, updateAssetCategory);
router.delete('/:id', validateIdParam, validate, deleteAssetCategory);

module.exports = router;
