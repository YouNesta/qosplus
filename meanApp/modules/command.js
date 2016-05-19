/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
var pdf = require('phantom-html2pdf');
var logger = require('winston');
var http = require('http');

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

        var command = req.body.command;
        var id = command._id;
        var path = "../myApp/public/pdf/"+id+".pdf";
        var savedPath = "/public/pdf/"+id+".pdf";
        var html = "<p>Error</p>";

        var reqOptions = {
            host: '192.168.33.10',
            port: 3000,
            path: "/product/command-pdf/"+id
        };
        http.get(reqOptions, function(resp){
            resp.setEncoding('utf8');
            resp.on('data', function(chunk){
                html = chunk;
                var options = {
                    "html" : html,
                    "paperSize" : {format: 'A4', orientation: 'portrait', border: '1cm'},
                    "deleteOnAction" : true
                };

                pdf.convert(options, function(result) {
                    result.toFile(path, function() {
                        command.commandForm = savedPath;
                        Command.findOneAndUpdate({_id: id}, command, { 'new': true }, function(err, command){
                            if(err){
                                console.log(err);
                                logger.log('error', err);
                                res.res.json({success: false, message:error});
                            }
                            res.json({success: true, message:"Command updated", data:  command});
                        })
                    });
                });
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });
    },

    getOneCommand: function(req, res){
        Command.findOne({_id: req.params.id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:err});
            } else {
                res.json({success: true, message:"Command find with success", data: command});
            }
        })
    },
};
