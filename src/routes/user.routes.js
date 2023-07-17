const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.controller');
const validateLogin = require('../middleware/validators/userValidator');
router.post('/register', validateLogin, signup);
router.post('/login', validateLogin, login);

module.exports = router;
