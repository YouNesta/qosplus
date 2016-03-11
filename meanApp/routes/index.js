var express = require('express');
var router = express.Router();
var cors = require('cors');


var corsOptions = {
  origin: 'http://192.168.33.10:3000',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: true
};

/* GET home page. */
router.get('/', cors(corsOptions),function(req, res, next) {
  res.sendStatus(404);

});

module.exports = router;
