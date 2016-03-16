var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Admin = require("../models/admin/admin.js").Admin;
var Shop = require("../models/shop.js").Shop;
var users = require("../modules/user.js");
var Token    = require('../modules/jsonwebtoken/module');



router.get('/', function(req, res) {
  console.log(1);
  var data = Token.getData(req);
  var model = User;

  if(data.role > 0){
    model = Admin;
  }
    model.findOne({_id: data._id} ,function(err, user) {

      if(err){
        console.log(error);
        logger.log('error', error);
        res.res.json({success: false, message:error});
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

router.post('/login', function(req, res) {
  console.log(1);
  if(req.body != 'undefined') {
    console.log(2);

    Admin.findOne({
      mail: req.body.user.mail
    }, function(err, user) {
      console.log(3);

      if(err){
        console.log(error);
        logger.log('error', error);
        res.res.json({success: false, message:error});
      }
      if (!user) {
        console.log(4);

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
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
              var token = Token.setData(user);
              res.json({
                success: true,
                message: 'Authentification Success',
                token: token,
                data: user
              });
            }
          }
        });

      } else if (user) {
        console.log(5);

        if (users.isValidPassword(user, req.body.user.password)){
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          var token = Token.setData(user);
          res.json({
            success: true,
            message: 'Authentification Success',
            token: token,
            data: user
          });
        }
      }
    });
  }else{
    res.sendStatus(500);
  }

});

function  financialShop(req, res){

  if(req.body.option.financialShop){
    req.body.user.financialShop = req.body.user.shop;
    director(req, res);
  }else{
    var financialShop = new Shop(req.body.user.financialShop);
    financialShop.save(function(error){

      if(error){
        logger.log('error', error);
      }
      req.body.user.financialShop = financialShop._id;

      director(req, res);
    });
  }

}
function director(req, res){

  var director = req.body.user.director;
  delete req.body.user.director;
  console.log(req.body.user.director)
  req.body.user.state = 0;
  var user = new User(req.body.user);
  user.save( function(error) {

    if(error){
      console.log(error);
      logger.log('error', error);
    }
    if(req.body.option.director){
      console.log(req.body.option.director);

      user.director = user._id;

      User.findOneAndUpdate({_id: user._id}, {$set: { director:  user.director} },  function(error, data){
        if(error){
          console.log(error);
          logger.log('error', error);
          res.json({ success: false, message: "Subscribe Failed", data:error});

        }
        res.json({ success: true, message: "Subscribe Success", data:data});


      })
    }else{
      var Director = new User(director);

      Director.save( function(error) {
        if(error){
          console.log(error);
          logger.log('error', error);
          res.json({ success: false, message: "Subscribe Failed", data:error});

        }
        user.director = Director._id;
        User.findOneAndUpdate({_id: user._id}, {director:  Director._id }, {upsert: true},  function(error, data){
          if(error){
            console.log(error);
            logger.log('error', error);
            res.json({ success: false, message: "Subscribe Failed", data:error});

          }
          console.log(data);
          res.json({ success: true, message: "Subscribe Success", data:data});
        })
      });
    }
  });
}
router.post('/subscribe', function(req, res, next) {
  if(req.body != 'undefined'){
    req.body.shop.openHour = new Date(req.body.shop.openHour);
    req.body.shop.closeHour = new Date(req.body.shop.closeHour);
    var shop = new Shop(req.body.shop);
    shop.save(function(error){

      if(error){
        logger.log('error', error);
      }
      req.body.user.shop = shop._id;
      if(req.body.option.deliverShop){
        req.body.user.deliverShop = shop._id;
        financialShop(req, res);

      }else{
        var deliverShop = new Shop(req.body.user.deliverShop);
        deliverShop.save(function(error){

          if(error){
            logger.log('error', error);
          }
          req.body.user.deliverShop = deliverShop._id;
          financialShop(req, res);

        });
      }

    });
  }else{
    res.sendStatus(500);
  }
});





module.exports = router;


