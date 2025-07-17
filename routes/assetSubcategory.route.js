const express = require('express');
const router = express.Router();
const {
  getAssetSubcategories,
  createAssetSubcategory,
  updateAssetSubcategory,
  deleteAssetSubcategory
} = require('../controllers/assetSubcategory.controller');

router.get('/', getAssetSubcategories);
router.post('/', createAssetSubcategory);
router.put('/:id', updateAssetSubcategory);
router.delete('/:id', deleteAssetSubcategory);

module.exports = router;
