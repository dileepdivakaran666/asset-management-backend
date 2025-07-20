// routes/branch.route.js
const express = require('express');
const router = express.Router();
const {
  getBranches,
  getOneBranch,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branch.controller');
const { route } = require('./grn.route');

router.get('/', getBranches);
router.get('/:id', getOneBranch);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

module.exports = router;
