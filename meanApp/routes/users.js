var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Shop = require("../models/shop.js").Shop;

/* GET users listing. */

function  financialShop(req, res){

  if(!req.body.option.financialShop){
    req.body.user._financialShop = req.body.user._shop;
    director(req, res);
  }else{
    var financialShop = new Shop(req.body.user._financialShop);
    financialShop.save(function(error){

      if(error){
        logger.log('error', error);
      }
      req.body.user._financialShop = financialShop._id;

      director(req, res);
    });
  }

}

function director(req, res){
  if(!req.body.option.director){
    var _director = req.body.user._director;
    req.body.user._director = 0;
    delete req.body.user._director;
  }

  req.body.user._state = 0;
  var user = new User(req.body.user);
  user.save( function(error) {
    if(error){
      console.log(error);
      logger.log('error', error);
    }
    if(req.body.option.director){
      user._director = user._id;

      User.findOneAndUpdate({_id: user._id}, {$set: { _director:  user._director} },  function(error, data){
        if(error){
          console.log(error);
          logger.log('error', error);
        }
        res.json(data);

      })
    }else{
      var director = new User(_director);
      director.save( function(error) {
        if(error){
          console.log(error);
          logger.log('error', error);
        }
        user._director = director._id;
        User.findOneAndUpdate({_id: user._id}, {_director:  director._id }, {upsert: true},  function(error, data){
          if(error){
            console.log(error);

            logger.log('error', error);
          }
          res.json(data);
        })
      });
    }
  });
}



router.post('/subscribe', function(req, res, next) {
  if(req.body != 'undefined'){
    req.body.shop._openHour = new Date(req.body.shop._openHour);
    req.body.shop._closeHour = new Date(req.body.shop._closeHour);
    var shop = new Shop(req.body.shop);
    shop.save(function(error){

      if(error){
        logger.log('error', error);
      }
      req.body.user._shop = shop._id;
      console.log(req.body.user._shop)
      if(!req.body.option.deliverShop){
        req.body.user._deliverShop = req.body.user._shop;
        financialShop(req, res);

      }else{
        var deliverShop = new Shop(req.body.user._deliverShop);
        deliverShop.save(function(error){

          if(error){
            logger.log('error', error);
          }
          req.body.user._deliverShop = deliverShop._id;
          financialShop(req, res);

        });
      }

    }) ;









/*
    User.findOne({ '_id': "56e35c3b5a1eea7507d95be0" }, function (err, data) {
      if (err) return handleError(err);
      if( data != null){
        console.log(data)
      }
    });*/

  }else{
    res.sendStatus(500);
  }
});


















module.exports = router;


