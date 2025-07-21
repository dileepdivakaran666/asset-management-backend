const express = require("express");
const router = express.Router();
const reportController = require("../controllers/assetSummeryReport.controller");

router.get("/", reportController.getAssetSummary);
router.get("/export", reportController.exportAssetSummary);

module.exports = router;
