const express = require('express');
const router = express.Router();
const {
  createGRN,
  getOneGrn,
  getAllGRNs,
  getLineItems,
  updateGRN,
  deleteGRN,
  getGRNReport, 
  exportGRNReport,
  // exportGRNs,
  // exportAssetSummary 
} = require('../controllers/grn.controller');

router.get("/report/export", exportGRNReport);
router.get('/report', getGRNReport);
router.get('/', getAllGRNs);
router.get('/:id', getOneGrn);
router.get('/:grnId/line-items', getLineItems);
router.post('/', createGRN);
router.put('/:grnId', updateGRN);
router.delete('/:grnId', deleteGRN);
// router.get('/export', exportGRNs);
// router.get('/export-summary', exportAssetSummary);

module.exports = router;
