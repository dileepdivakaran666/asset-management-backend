const { body, param } = require('express-validator');

exports.validateManufacturer = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim(),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),
];

exports.validateIdParam = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];
