/**
 * Created by medrupaloscil on 19/03/2016.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var Product = require("../models/product/product.js").Product;
//var users = require("../modules/user.js");
var Token    = require('../modules/jsonwebtoken/module');

router.post('/list', function(req, res, next) {
    if(req.body != 'undefined'){
        product.getProduct(req, res);
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;