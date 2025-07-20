const express = require('express');
const router = express.Router();
const {
  createGRN,
  getAllGRNs,
  getLineItems,
  updateGRN,
  deleteGRN, 
  exportGRNs,
  exportAssetSummary 
} = require('../controllers/grn.controller');

router.get('/', getAllGRNs);
router.get('/:grnId/line-items', getLineItems);
router.post('/', createGRN);
router.put('/:grnId', updateGRN);
router.delete('/:grnId', deleteGRN);
router.get('/export', exportGRNs);
router.get('/export-summary', exportAssetSummary);

module.exports = router;
