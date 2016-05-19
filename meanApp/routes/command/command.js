/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var express = require('express');
var router = express.Router();
var Command = require("../../models/command/command.js").Command;
var Payment = require("../../models/command/payment.js").Payment;
var CommandModule = require('../../modules/command');




router.post('/create',function(req, res) {
    if(req.body != 'undefined'){
        CommandModule.addCommand(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.get('/list',function(req, res) {
    if(req.body != 'undefined'){
        CommandModule.getCommands(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.post('/list/user',function(req, res) {
    if(req.body != 'undefined'){
        CommandModule.getCommandsByUser(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.post('/command/:id',function(req, res) {
    if(req.body != 'undefined'){
        CommandModule.getOneCommand(req, res);
    }else{
        res.sendStatus(500);
    }
});

router.post('/printPdf',function(req, res) {
    if(req.body != 'undefined'){
        CommandModule.printPdf(req, res);
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;


