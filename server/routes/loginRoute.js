const express = require('express');
const router = express.Router();
const LoginCtrl = require('../controllers/loginCtrl');

router.post('/', LoginCtrl.login);

module.exports = router;
