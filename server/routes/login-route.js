const express = require('express');
const router = express.Router();
const LoginCtrl = require('../controllers/loginCtrl');
const checkUser = require('../middleware/check-user')

router.post('/', checkUser, LoginCtrl.login);

module.exports = router;
