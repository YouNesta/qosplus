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
   product.getProducts(req, res);
});

router.post('/add', function(req, res, next) {
    if(req.body.product != 'undefined'){
        product.addProduct(req, res);
    } else {
        res.sendStatus(500);
    }
});

router.put('/edit/', function(req, res, next){
    if(req.body.product != 'undefined'){
        console.log('test');
        product.editProduct(req, res);
    } else {
        console.log('test2');
        res.sendStatus(500);
    }
});

router.post('/delete', function(req, res){
    if(req.body.product != "undefined"){
        product.deleteProduct(req, res);
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;