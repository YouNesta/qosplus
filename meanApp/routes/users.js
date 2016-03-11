var express = require('express');
var router = express.Router();

var User = require("../models/user.js").User;

/* GET users listing. */

router.post('/subscribe', function(req, res, next) {
  console.log(req.body._mail);
  res.json({text: "lala"});
});

module.exports = router;


