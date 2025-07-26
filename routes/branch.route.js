// routes/branch.route.js
const express = require('express');
const router = express.Router();
const {
  getBranches,
  getOneBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require('../controllers/branch.controller');
const { validateBranch, validateIdParam } = require('../validators/branch.validator');
const validate = require('../middlewares/validate');

router.get('/', getBranches);
router.get('/:id',validateIdParam, validate, getOneBranch);
router.post('/',validateBranch, validate, createBranch);
router.put('/:id',validateIdParam, validateBranch,validate, updateBranch);
router.delete('/:id',validateIdParam, validate, deleteBranch);

module.exports = router;
