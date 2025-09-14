const { body } = require('express-validator');

exports.registerValidation = [
  body('username', 'Username is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

exports.profileUpdateValidation = [
  body('firstName').optional().isString().trim().notEmpty(),
  body('lastName').optional().isString().trim().notEmpty(),
  body('bio').optional().isString().trim(),
  body('sports').optional().isArray(),
  body('skillLevel').optional().isString().trim().notEmpty(),
  body('location.latitude').optional().isNumeric(),
  body('location.longitude').optional().isNumeric(),
  body('availability').optional().isArray(),
  body('profilePicture').optional().isURL(),
];
