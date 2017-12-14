const jwt = require('jsonwebtoken');
const FB = require('fb');

class Login {
  static login(req, res, next) {
    console.log(req.body);
    let fb = new FB.Facebook({
      accessToken: req.body.accessToken,
      appId: process.env.FBAPPID,
      appSecret: process.env.FBAPPSECRET
    })
    fb.api(req.body.userId, function(response) {
      if (response.error) {
        res.status(400).json(response.error);
      } else {
        var token = jwt.sign({
          id: response.id,
          name: response.name,
        }, process.env.SECRETKEY);
        res.status(200).json(token);
      }
    });
  }
}

module.exports = Login;
