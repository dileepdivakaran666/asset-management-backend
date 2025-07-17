// routes/vendor.route.js
const express = require('express');
const router = express.Router();
const {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor
} = require('../controllers/vendor.controller');

router.get('/', getVendors);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;
