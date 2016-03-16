var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');
var jwt    = require('jsonwebtoken');


var Admin = require("../../models/admin/admin.js").Admin;
var Token    = require('../../modules/jsonwebtoken/module');
var users    = require('../../modules/user');




router.post('/subscribe',function(req, res) {
  if(req.body != 'undefined'){
     var crypted  = users.generatePassword(req.body.admin.password);
     req.body.admin.password = crypted.password;
     req.body.admin.hash = crypted.hash;
     req.body.admin.role = 1;
     var admin = new Admin(req.body.admin);
    Admin.findOne({
      mail: req.body.admin.mail
    }, function(err, user) {
      if(err){
        console.log(error);
        logger.log('error', error);
        res.res.json({success: false, message:error});
      }
      if (!user) {
        admin.save( function(error) {
          if(error){
            console.log(error);
            logger.log('error', error);
            res.res.json({success: false, message:error});
          }
          delete req.body.admin.password;
          var data = req.body.admin;
          res.json({success: true, message:"Subscribe success", data: data});
        });
      } else if (user) {
        res.json({ success: false, message: 'Subscribe failed. User Already exist.' });
      }
    });
   }else{
     res.sendStatus(500);
   }
});





router.get('/', function(req, res, next) {
  Admin.find({}, function(err, users) {
    if(err){
      console.log(err);
      logger.log('error', err);
      res.res.json({success: false, message:error});
    }
    res.json({success: true, message:"User List Find with success", data: users});
  });
});









module.exports = router;


