const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.controller');
const validateLogin = require('../middleware/validators/userValidator');
router.post('/signup', validateLogin, signup);

module.exports = router;
