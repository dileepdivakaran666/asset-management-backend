// routes/branch.route.js
const express = require('express');
const router = express.Router();
const {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branch.controller');

router.get('/', getBranches);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

module.exports = router;
