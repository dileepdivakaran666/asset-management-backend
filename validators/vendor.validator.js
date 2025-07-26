const { body, param } = require('express-validator');

exports.validateVendor = [
  body('name')
    .notEmpty().withMessage('Vendor name is required')
    .isString().withMessage('Name must be a string')
    .trim(),

  body('contactPerson')
    .optional()
    .isString().withMessage('Contact person must be a string')
    .trim(),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),

  body('address')
    .optional()
    .isString().withMessage('Address must be a string')
    .trim(),

  body('gstNumber')
    .optional()
    .isString().withMessage('GST number must be a string')
    .trim(),
];

exports.validateIdParam = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];
