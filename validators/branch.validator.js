// validators/branch.validator.js
const { body, param } = require('express-validator');

exports.validateBranch = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim(),

  body('location')
    .optional()
    .isString().withMessage('Location must be a string')
    .trim(),

  body('code')
    .notEmpty().withMessage('Code is required')
    .isString().withMessage('Code must be a string')
    .trim(),

  body('status')
    .optional()
    .isBoolean().withMessage('Status must be a boolean'),
];

exports.validateIdParam = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];
