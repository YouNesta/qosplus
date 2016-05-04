var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Admin = require("../models/admin/admin.js").Admin;
var Shop = require("../models/shop.js").Shop;
var users = require("../modules/user.js");
var Token    = require('../modules/jsonwebtoken/module');



router.get('/get', function(req, res) {   // Get user

  var data = Token.getData(req);
  var model = User;
  if(data.role > 0){
    model = Admin;
  }
    model.findOne({_id: data._id} ,function(err, user) {
      if(err){
        console.log(error);
        logger.log('error', error);
        res.res.json({success: false, message:error
        });
      }
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        data.mail = user.mail;
        data.phone = user.phone;
        data.firstName = user.firstName;
        data.lastName = user.lastName;
        res.json({
          success: true,
          message: 'User Found',
          data: data
        });

      }
    });
});

router.post('/login', function(req, res) {   // Login
  if(req.body != 'undefined') {

    Admin.findOne({
      mail: req.body.user.mail
    }, function(err, user) {

      if(err){
        console.log(error);
        logger.log('error', error);
        res.res.json({success: false, message:error});
      }
      if (!user) {
        User.findOne({
          mail: req.body.user.mail
        }, function(err, user) {
          if(err){
            console.log(error);
            logger.log('error', error);
            res.res.json({success: false, message:error});
          }
          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {
            if (users.isValidPassword(user, req.body.user.password)){
              var token = Token.setData(user);
              res.json({
                success: true,
                message: 'Authentification Success',
                token: token,
                data: user
              });
            } else {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });


            }
          }
        });

      } else if (user) {

        if (users.isValidPassword(user, req.body.user.password)){
          var token = Token.setData(user);
          res.json({
            success: true,
            message: 'Authentification Success',
            token: token,
            data: user
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });


        }
      }
    });
  }else{
    res.sendStatus(500);
  }

});



router.post('/subscribe', function(req, res, next) {
  if(req.body != 'undefined'){
    users.setUser(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.put('/', function(req, res, next) {
  if(req.body != 'undefined'){
    users.update(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.put('/edit', function(req,res,next){
  if(req.body != 'undefined'){
    users.update(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.post('/profile', function(req,res,next){
  if(req.body != 'undefined'){
    users.getProfile(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.post('/commands', function(req, res, next){
  if(req.body != 'undefined'){
    users.getUserCommands(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.post('/payments', function(req, res, next){
  if(req.body != 'undefined'){
    users.getUserPayments(req, res);
  }else{
    res.sendStatus(500);
  }
});





module.exports = router;


