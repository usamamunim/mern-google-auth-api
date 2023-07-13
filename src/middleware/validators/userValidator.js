const { body, validationResult } = require('express-validator');
const validateLogin = [
  body('email').notEmpty().isEmail().withMessage('Email is Invalid'),
  body('password').isLength({ min: 3 }).withMessage('Atleast 3 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return next();
  },
];

module.exports = validateLogin;
