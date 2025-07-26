const { body, param } = require('express-validator');

exports.validateAssetSubcategory = [
  body('categoryId')
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Category ID must be a valid Mongo ID'),

  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim(),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),

  body('status')
    .optional()
    .isBoolean().withMessage('Status must be a boolean'),
];

exports.validateIdParam = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];
