/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
//var webPage = require("webpage").create();
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
        Command.find({client: user.mail}, function(err, commands){
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
    },

    printPdf: function(req, res) {

        var page = webPage.create();

        console.log(page);

        var command = req.body.command;
        var path = "../../myApp/public/pdf/"+command._id+".pdf";

        page.viewportSize = {width: 1920, height: 1080};

        page.paperSize = {format: 'Letter', orientation: 'portait', order: '0.5in'};

        page.open('http://nonogramo.com', function(result) {
            console.log(status);
            console.log("testouille");
            if ( status === "success" ) {
                page.render( 'example.pdf' );
                command.commandForm = path;
                Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function(err, command){
                    if(err){
                        console.log(err);
                        logger.log('error', err);
                        res.res.json({success: false, message:error});
                    }
                    res.json({success: true, message:"Command updated", data:  command});
                })
            } else {
                res.json({success: false, message:"Error", data:  null});
            }
            phantom.exit();
        });
    },

    getOneCommand: function(req, res){
        console.log(req.params.id);
        Command.findOne({_id: req.params.id}, function(err, command){
            if(err)
            {
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:err});
            }else{
                console.log('testtest');
                res.json({success: true, message:"User List Find with success", data: command});
            }
        })
    }
};
