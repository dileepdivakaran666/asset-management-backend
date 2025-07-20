// routes/manufacturer.route.js
const express = require('express');
const router = express.Router();
const {
  getManufacturers,
  getOneManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer
} = require('../controllers/manufacturer.controller');

router.get('/', getManufacturers);
router.get('/:id', getOneManufacturer);
router.post('/', createManufacturer);
router.put('/:id', updateManufacturer);
router.delete('/:id', deleteManufacturer);

module.exports = router;
