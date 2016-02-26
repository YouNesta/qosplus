var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/subscribe', function(req, res, next) {
  console.log(req, res);
  res.sendStatus(200);
});

module.exports = router;
