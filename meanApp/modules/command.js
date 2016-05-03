/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
var logger = require('winston');

module.exports = {

    getCommands: function(req, res) {
        Command.find({}, function(err, commands) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:error});
            }
            res.json({success: true, message:"Command List Find with success", data:  commands});
        });
    },
    getCommandsByUser: function(req, res){
        var user = req.body.user;
        Command.find({client: user._id}, function(err, commands){
            if(err){
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:error});
            }
            res.json({success: true, message:"Command List Find with success", data:  commands});
        })
    },

    addCommand: function(req, res) {

        var payment = new Payment(req.body.payment);
        payment.save(function(error, payment){
            if(error){
                console.log(error);
                logger.log('error', error);
            }
        });
        var command = new Command(req.body.command);
        command.save(function(error, command){
            if(error){
                console.log(error);
                logger.log('error', error);
            } else {
                console.log(command);
            }
        });

        res.json({success: true, message:"Command Added with success", data:  []});
    }
};
