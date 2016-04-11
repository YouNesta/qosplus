/**
 * Created by medrupaloscil on 19/03/2016.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');
var jwt = require('jsonwebtoken');


var Product = require("../models/product/product.js").Product;
var product = require("../modules/product.js");
var Token    = require('../modules/jsonwebtoken/module');

router.get('/list', function(req, res, next) {
    Product.find({}, function(err, product) {
        if(err){
            console.log(err);
            logger.log('error', err);
            res.res.json({success: false, message:error});
        }
        res.json({success: true, message:"Product List Find with success", data: product});
    });
});

router.post('/add', function(req, res, next) {
    if(req.body.product != 'undefined'){
        product.setProduct(req, res);
        res.json({
           product: req.body.product
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;