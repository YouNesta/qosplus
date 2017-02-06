var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logger = require('winston');


var User = require("../models/user.js").User;
var Mail = require("../models/mail/mail.js").Mail;
var MailData = require("../models/mail/mailData.js").MailData;
var Admin = require("../models/admin/admin.js").Admin;
var users = require("../modules/user.js");
var mails = require('../modules/mail.js');
var Token    = require('../modules/jsonwebtoken/module');

router.post('/add', function(req, res){
    console.log('hhk')
    if(req.body != 'undefined'){
        mails.saveMail(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.get('/send', function(req, res){
    mails.sendNonSended();
});

router.get('/crashed', function(req, res){
    if(req.body != 'undefined'){
        mails.getCrashedMail();
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;