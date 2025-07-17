const express = require('express');
const router = express.Router();
const {
  createGRN,
  getAllGRNs,
  getLineItems
} = require('../controllers/grn.controller');

router.get('/', getAllGRNs);
router.get('/:grnId/line-items', getLineItems);
router.post('/', createGRN);

module.exports = router;
