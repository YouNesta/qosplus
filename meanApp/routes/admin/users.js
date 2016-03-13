var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');
var Admin = require("../../models/admin/admin.js").Admin;






router.post('/subscribe', function(req, res, next) {

  Admin
  if(req.body != 'undefined'){
    console.log(req.body);
    res.send(200, req.body);
  }else{
    res.sendStatus(500);
  }
});


















module.exports = router;


