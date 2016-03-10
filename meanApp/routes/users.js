var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/subscribe', function(req, res, next) {
  console.log(req.body._mail);
  res.json({text: "lala"})
      .sendStatus(200);
});

module.exports = router;


