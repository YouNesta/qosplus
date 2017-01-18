var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Admin = require("../models/admin/admin.js").Admin;
var Shop = require("../models/shop.js").Shop;
var users = require("../modules/user.js");
var shops = require("../modules/shop.js");
var Token    = require('../modules/jsonwebtoken/module');



router.get('/get', function(req, res) {   // Get user

  var data = Token.getData(req);
  var model = User;
  if(data.role > 0){
    model = Admin;
  }
    model.findOne({_id: data._id} ,function(error, user) {
      if(error){
        console.log(error);
        logger.log('error', error);
        res.json({success: false, message:error
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
    }, function(error, user) {

      if(error){
        console.log(error);
        logger.log('error', error);
        res.json({success: false, message:error});
      }
      if (!user) {

        if(Number(req.body.user.mail)){
          var mail = "";
          var code = req.body.user.mail;
        }else{
          var mail = req.body.user.mail;
          var code = 00;
        }

        User.findOne({
          $or:[
            {mail: mail},
            {code: code}
          ]},
            function(error, user) {
          if(error){
            console.log(error);
            logger.log('error', error);
            res.json({success: false, message:error});
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

router.put('/edit', function(req,res,next){
  if(req.body != 'undefined'){
    users.update(req, res);
  }else{
    res.sendStatus(500);
  }
});


router.post('/profile', function(req,response,next){
  if(req.body != 'undefined'){
    users.getProfile(req, response);
  }else{
    response.sendStatus(500);
  }
});

router.post('/getUserShops', function(req,response,next){
  if(req.body != 'undefined'){
    users.getUserShops(req, response);
  }else{
    response.sendStatus(500);
  }
});

router.post('/getByMail', function(req,res,next){
  if(req.body != 'undefined'){
    users.getByMail(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.post('/getById', function(req,res,next){
  if(req.body != 'undefined'){
    users.getById(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.post('/getShops', function(req,res,next){
  if(req.body != 'undefined'){
    shops.getShops(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.get('/getAllShops', function(req,res,next){
  if(req.body != 'undefined'){
    shops.getAllShops(req, res);
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

router.get('/list',function(req, res) {
  if(req.body != 'undefined'){
    users.getUsers(req, res);
  }else{
    res.sendStatus(500);
  }
});

router.get('/getMails', function(req, res) {   // Get user mails
  var model = User;

  model.find({} ,function(error, users) {
    if(error){
      console.log(error);
      logger.log('error', error);
      res.json({success: false, message:error
      });
    }
    if (!users) {
      res.json({ success: false, message: 'No user found' });
    } else if (users) {
      var mails = [];
      for (i in users) {
        mails.push(users[i].mail);
      }
      data = mails;
      res.json({
        success: true,
        message: 'Users mails Found',
        data: data
      });

    }
  });
});

router.post('/resetpwd', function(req, res){
    User.find({
        mail: req.body.user.mail
    }, function(error, user){
        if(error){
            console.log(error);
            logger.log('error', error);
            res.json({success: false, message:error});
        }else{
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                var pwds = users.generateClearPassword();
                user = user[0];
                user.password = pwds.password;
                user.hash = pwds.hash;
                User.findOneAndUpdate({_id: user._id}, {$set: {hash: user.hash, password: user.password} }, { upsert: false } ,function(error, user){
                    if(error){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                        }
                    }else{
                        console.log(user);
                        console.log('win');
                        res.json({success: true, message: 'password succesfully updated', data: pwds.clear})
                    }
                })

            }
        }
    })

});



module.exports = router;


