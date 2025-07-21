const GRNHeader = require('../models/GRNHeader');


exports.fetchGRNReport = async (filters) => {
  const { from, to, vendor, branch } = filters;

  const query = {};

  // Date Range
  if (from && to) {
    query.grnDate = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  }

  // Vendor Filter
  if (vendor) {
    query.vendorId = vendor;
  }

  // Branch Filter
  if (branch) {
    query.branchId = branch;
  }

  const grns = await GRNHeader.find(query)
    .populate("vendorId")
    .populate("branchId")
    .sort({ grnDate: -1 });

  return grns;
};