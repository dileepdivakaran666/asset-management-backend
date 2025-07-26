// routes/vendor.route.js
const express = require('express');
const router = express.Router();
const {
  getVendors,
  getOneVendor,
  createVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendor.controller');
const { validateVendor, validateIdParam } = require('../validators/vendor.validator');
const validate = require('../middlewares/validate');

router.get('/', getVendors);
router.get('/:id', validateIdParam, validate, getOneVendor);
router.post('/', validateVendor, validate, createVendor);
router.put('/:id', validateIdParam, validateVendor, validate, updateVendor);
router.delete('/:id', validateIdParam, validate, deleteVendor);

module.exports = router;
