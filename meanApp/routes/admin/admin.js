var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');
var Admin = require("../../models/admin/admin.js").Admin;
var crypto = require('crypto');





router.post('/subscribe', function(req, res, next) {
  if(req.body != 'undefined'){

    var admin = new Admin(req.body.admin);
    var buf = crypto.randomBytes(16);
    var txt = buf.toString('hex');


    var SHA256 = require("crypto-js/sha256");
    var hash =  SHA256(req.body.admin._password+txt);
    admin._password = hash.toString();
    admin._hash = txt;

    admin.save( function(error) {
      if(error){
        console.log(error);
        logger.log('error', error);
      }

    });
    res.status(200).send(admin);
  }else{
    res.sendStatus(500);
  }
});


















module.exports = router;


