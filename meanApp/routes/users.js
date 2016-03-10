var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/subscribe', function(req, res, next) {
  res.json({text: "lala"})
      .sendStatus(200);

});

module.exports = router;
