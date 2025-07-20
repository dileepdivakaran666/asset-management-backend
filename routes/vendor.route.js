// routes/vendor.route.js
const express = require('express');
const router = express.Router();
const {
  getVendors,
  getOneVendor,
  createVendor,
  updateVendor,
  deleteVendor
} = require('../controllers/vendor.controller');

router.get('/', getVendors);
router.get('/:id', getOneVendor)
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;
