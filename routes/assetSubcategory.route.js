const express = require('express');
const router = express.Router();
const {
  getAssetSubcategories,
  getOneAssetSubcategories,
  createAssetSubcategory,
  updateAssetSubcategory,
  deleteAssetSubcategory,
} = require('../controllers/assetSubcategory.controller');
const { validateAssetSubcategory, validateIdParam } = require('../validators/assetSubcategory.validator');
const validate = require('../middlewares/validate');

router.get('/', getAssetSubcategories);
router.get('/:id',validateIdParam, validate, getOneAssetSubcategories);
router.post('/',validateAssetSubcategory, validate, createAssetSubcategory);
router.put('/:id',validateIdParam, validateAssetSubcategory,validate, updateAssetSubcategory);
router.delete('/:id',validateIdParam, validate, deleteAssetSubcategory);

module.exports = router;
