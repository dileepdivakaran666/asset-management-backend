const { body, param } = require('express-validator');

exports.validateGRN = [
  body('grnData.grnNumber').notEmpty().withMessage('GRN Number is required'),
  body('grnData.grnDate').isISO8601().withMessage('GRN Date must be a valid date'),
  body('grnData.invoiceNumber').notEmpty().withMessage('Invoice Number is required'),
  body('grnData.vendorId')
    .notEmpty()
    .withMessage('Vendor ID is required')
    .isMongoId()
    .withMessage('Vendor ID must be a valid Mongo ID'),
  body('grnData.branchId')
    .notEmpty()
    .withMessage('Branch ID is required')
    .isMongoId()
    .withMessage('Branch ID must be a valid Mongo ID'),
  body('lineItems').isArray({ min: 1 }).withMessage('At least one line item is required'),

  body('lineItems.*.subcategoryId')
    .notEmpty()
    .withMessage('Subcategory ID is required')
    .isMongoId()
    .withMessage('Subcategory ID must be a valid Mongo ID'),
  body('lineItems.*.itemDescription').notEmpty().withMessage('Item description is required'),
  body('lineItems.*.quantity').isNumeric().withMessage('Quantity must be a number'),
  body('lineItems.*.unitPrice').isNumeric().withMessage('Unit price must be a number'),
  body('lineItems.*.taxPercent').optional().isNumeric().withMessage('Tax percent must be a number'),
];

exports.validateIdParam = [param('id').isMongoId().withMessage('Invalid GRN ID format')];
