const ExcelJS = require("exceljs");
const GRNLineItem = require('../models/GRNLineItem');

exports.getAssetSummary = async () => {
  const result = await GRNLineItem.aggregate([
    {
      $lookup: {
        from: "grnheaders",
        localField: "grnId",
        foreignField: "_id",
        as: "grn"
      }
    },
    { $unwind: "$grn" },
    {
      $lookup: {
        from: "branches",
        localField: "grn.branchId",
        foreignField: "_id",
        as: "branch"
      }
    },
    { $unwind: "$branch" },
    {
      $lookup: {
        from: "assetsubcategories",
        localField: "subcategoryId",
        foreignField: "_id",
        as: "subcategory"
      }
    },
    { $unwind: "$subcategory" },
    {
      $lookup: {
        from: "assetcategories",
        localField: "subcategory.categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: {
          categoryName: "$category.name",
          branchName: "$branch.name"
        },
        assetCount: { $sum: "$quantity" }
      }
    },
    {
      $project: {
        _id: 0,
        categoryName: "$_id.categoryName",
        branchName: "$_id.branchName",
        assetCount: 1
      }
    },
    { $sort: { categoryName: 1, branchName: 1 } }
  ]);

  return result;
};

exports.exportAssetSummary = async () => {
  const data = await exports.getAssetSummary();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Asset Summary");

  sheet.columns = [
    { header: "Category Name", key: "categoryName", width: 30 },
    { header: "Branch Name", key: "branchName", width: 30 },
    { header: "Asset Count", key: "assetCount", width: 15 }
  ];

  data.forEach((item) => {
    sheet.addRow(item);
  });

  return workbook;
};