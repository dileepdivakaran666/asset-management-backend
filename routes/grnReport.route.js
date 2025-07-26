const express = require('express');
const router = express.Router();

const { exportGRNReport, getGRNReport } = require('../controllers/grnReport.controller');

router.get('/export', exportGRNReport);
router.get('/report', getGRNReport);

module.exports = router;
