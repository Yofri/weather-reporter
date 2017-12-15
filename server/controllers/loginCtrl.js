const Login = require('../models/login');
class LoginCtrl {
  static login(req, res, next) {
    Login.login(req, res, next)
  }
}

module.exports = LoginCtrl;
