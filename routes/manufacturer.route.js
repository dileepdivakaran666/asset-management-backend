// routes/manufacturer.route.js
const express = require('express');
const router = express.Router();
const {
  getManufacturers,
  getOneManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
} = require('../controllers/manufacturer.controller');
const { validateManufacturer, validateIdParam } = require('../validators/manufacturer.validator');
const validate = require('../middlewares/validate');

router.get('/', getManufacturers);
router.get('/:id',validateIdParam, validate, getOneManufacturer);
router.post('/',validateManufacturer, validate, createManufacturer);
router.put('/:id',validateIdParam, validateManufacturer, validate, updateManufacturer);
router.delete('/:id',validateIdParam, validate, deleteManufacturer);

module.exports = router;
