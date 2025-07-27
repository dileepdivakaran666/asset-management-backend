const express = require('express');
const router = express.Router();
const {
  createGRN,
  getOneGrn,
  getAllGRNs,
  updateGRN,
  deleteGRN,
  // getGRNReport,
  // exportGRNReport,
} = require('../controllers/grn.controller');
const { validateGRN, validateIdParam } = require('../validators/grn.validator');
const validate = require('../middlewares/validate');

// router.get('/report/export', exportGRNReport);
// router.get('/report', getGRNReport);
router.get('/', getAllGRNs);
router.get('/:id', validateIdParam, validate, getOneGrn);
// router.get('/:grnId/line-items', getLineItems);
router.post('/', validateGRN, validate, createGRN);
router.put('/:id', validateIdParam, validateGRN, validate, updateGRN);
router.delete('/:id', validateIdParam,validate, deleteGRN);

module.exports = router;
