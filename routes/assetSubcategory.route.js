const express = require('express');
const router = express.Router();
const {
  getAssetSubcategories,
  getOneAssetSubcategories,
  createAssetSubcategory,
  updateAssetSubcategory,
  deleteAssetSubcategory
} = require('../controllers/assetSubcategory.controller');

router.get('/', getAssetSubcategories);
router.get('/:id', getOneAssetSubcategories);
router.post('/', createAssetSubcategory);
router.put('/:id', updateAssetSubcategory);
router.delete('/:id', deleteAssetSubcategory);

module.exports = router;
