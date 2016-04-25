/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var express = require('express');
var router = express.Router();
var Command = require("../../models/command/command.js").Command;
var Payment = require("../../models/command/payment.js").Payment;
var CommandModule    = require('../../modules/command');




router.post('/create',function(req, res) {
    if(req.body != 'undefined'){

    }else{
        res.sendStatus(500);
    }
});

module.exports = router;


