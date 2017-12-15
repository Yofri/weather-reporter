const express = require('express');
const router = express.Router();
const middle = require('../middleware/check-user');


/* GET users listing. */
router.post('/', middle,function(req, res) {
  res.status(200).json({
    msg : 'success'
  });
});

module.exports = router;
