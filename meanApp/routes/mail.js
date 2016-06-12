var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Mail = require("../models/mail/mail.js").Mail;
var MailData = require("../models/mail/mail.js").MailData;
var Admin = require("../models/admin/admin.js").Admin;
var Shop = require("../models/shop.js").Shop;
var users = require("../modules/user.js");
var mails = require('../modules/mail.js');
var shops = require("../modules/shop.js");
var Token    = require('../modules/jsonwebtoken/module');

router.post('/add', function(req, res){
    if(req.body != 'undefined'){
        mails.saveMail(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.get('/crashed', function(req, res){
    if(req.body != 'undefined'){
        mails.getCrashedMail();
    }else{
        res.sendStatus(500);
    }
});