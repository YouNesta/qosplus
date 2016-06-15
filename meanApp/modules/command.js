/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
var User = require("../models/user.js").User;
var pdf = require('phantom-html2pdf');
var logger = require('winston');
var http = require('http');
var fs = require('fs');

module.exports = {

    getCommands: function(req, res) {
        Command.find({}, function(err, commands) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Command List Find with success", data:  commands});
        });
    },

    getPayments: function(req, res) {
        Payment.find({}, function(err, payments) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Payments List Find with success", data:  payments});
        });
    },

    getCommandsByUser: function(req, res){
        var user = req.body.user;
        Command.find({client: user.mail}, function(err, commands){
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
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
            } else {
                var command = new Command(req.body.command);
                command.payment = payment._id;
                command.save(function(error, command){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                    } else {
                        console.log(command);
                        res.json({success: true, message:"Command Added with success", data:  []});
                    }
                });
            }
        });
    },

    printPdf: function(req, res) {

        var command = req.body.command;
        var shop = command.shop;
        var id = command._id;
        var path = "../myApp/public/pdf/"+id+".pdf";
        var savedPath = "/public/pdf/"+id+".pdf";
        var html = "<p>Error</p>";

        User.findOne({mail: command.client}, function(err, client){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {

                var months = [
                    "janvier",
                    "fevrier",
                    "mars",
                    "avril",
                    "mai",
                    "juin",
                    "juillet",
                    "aout",
                    "septembre",
                    "octobre",
                    "novembre",
                    "décembre"
                ];

                var date = new Date(command.date);
                html = '<html>'+
                    '<head>'+
                    '<style type="text/css">'+
                    'body, table {'+
                    'font-size: 12px;'+
                    '}'+
                    'table {'+
                    'border-collapse: collapse;'+
                    'border-spacing: 0;'+
                    '}'+
                    '.row {'+
                    'display: block;'+
                    'width: 100%;'+
                    '}'+
                    '.col-md-5, .col-md-6, .col-md-10 {'+
                    'display: inline-block;'+
                    'padding: 20px;'+
                    '}'+
                    '.col-md-5 {'+
                    'width: 32%;'+
                    '}'+
                    '.col-md-6 {'+
                    'width: 50%;'+
                    '}'+
                    '.col-md-12 {'+
                    'width: 100%;'+
                    '}'+
                    '.text-center {'+
                    'text-align: center;'+
                    '}'+
                    'td {'+
                    'border: 1px solid #000;'+
                    'padding: 10px;'+
                    '}'+
                    '.clearfix {'+
                    'margin-top: 20px;'+
                    'margin-bottom: 20px;'+
                    '}'+
                    '</style>'+
                    '</head>'+
                    '<body>'+
                    '<div class="content command-pdf">'+
                    '<div class="row">'+
                    '<div class="col-md-6">'+
                    '<address>'+
                    'QosPlus<br>'+
                    '10, rue des mimosas<br>'+
                    '75007 Paris'+
                    '</address>'+
                    '<div class="clearfix"></div>'+
                    '<p>Bon N°'+command._id+'</p>'+
                    '<p>Du le '+ date.getUTCDate() +' '+ months[date.getUTCMonth()] +' '+ date.getUTCFullYear()+'</p>'+
                    '</div>'+
                    '<div class="col-md-5 text-center">'+
                    '<address>'+
                    client.firstName + client.lastName +'<br>'+
                    client.mail + '<br><br>'+
                    shop.name + '<br>'+
                    shop.adress + '<br>'+
                    shop.zipCode + ' ' + shop.city + '<br>'+
                    '</address>'+
                    '</div>'+
                    '</div>';

                for (var i = 0; i < command.product.length; i++) {
                    var product = command.product[i];

                    var options = "";

                    if (product.item.diameter != null) {
                        options += "diameter: "+ product.item.diameter + "<br>";
                    }
                    if (product.item.radius != null) {
                        options += "rayon: "+ product.item.radius + "<br>";
                    }
                    if (product.item.axis != null) {
                        options += "axe: "+ product.item.axis + "<br>";
                    }
                    if (product.item.cylinder != null) {
                        options += "cylindre: "+ product.item.cylinder + "<br>";
                    }

                    html += '<div class="row">'+
                        '<div class="col-md-12 text-center">'+
                        '<table>'+
                        '<thead>'+
                        '<td>Porteur</td>'+
                        '<td>Code Produit</td>'+
                        '<td>Nom</td>'+
                        '<td>Sphère</td>'+
                        '<td>Qté.</td>'+
                        '</thead>'+
                        '<tr>'+
                        '<td>'+product.porter+'</td>'+
                        '<td>'+product.reference+'</td>'+
                        '<td>'+product.name+'</td>'+
                        '<td> sphere: '+product.item.sphere+'<br>' +
                        'hydrophilie: '+ product.hydrophily+ '<br>' +
                            options +
                        '</td>'+
                        '<td>'+product.quantity+'</td>'+
                        '</tr>'+
                        '</table>'+
                        '</div>'+
                        '</div>';
                }

                html += '</div>'+
                    '</body>'+
                    '</html>';

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
                                res.json({success: false, message:error});
                            }
                            res.json({success: true, message:"Command updated", data:  command});
                        })
                    });
                });
            }
        });

    },

    getOneCommand: function(req, res) {
        Command.findOne({_id: req.params.id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                res.json({success: true, message:"Command find with success", data: command});
            }
        })
    },

    changePaymentStatus: function(req, res) {
        var id = req.body.id;
        console.log(id);
        Payment.findOne({_id: id}, function(err, payment){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                console.log(payment);
                if (payment.status == 0) {
                    payment.status = 1;
                    updateCommandAndPayment(0);
                } else {
                    payment.status = 0;
                    updateCommandAndPayment(2);
                }

                function updateCommandAndPayment(status) {
                    Command.findOne({payment: payment._id}, function(err, command){
                        if(err) {
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        } else {
                            command.status = status;

                            Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function(err, command){
                                if(err) {
                                    console.log(err);
                                    logger.log('error', err);
                                    res.json({success: false, message:err});
                                } else {
                                    var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                                    fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                                        if (!err) fs.unlinkSync(path_facture);
                                    });
                                    Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, payment){
                                        if(err) {
                                            console.log(err);
                                            logger.log('error', err);
                                            res.json({success: false, message:err});
                                        } else {
                                            res.json({success: true, message:"Payment updated", data: payment});
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            }
        })
    },

    printFacture: function(req, res) {
        var payment = req.body.payment;
        var id = payment._id;
        Command.findOne({payment: id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                var path = "../myApp/public/pdf/"+id+".pdf";
                var savedPath = "/public/pdf/"+id+".pdf";
                var html = "<p>Error</p>";
                var shop = command.shop;

                User.findOne({mail: command.client}, function(err, client){
                    if(err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message:err});
                    } else {

                        var date = new Date(payment.date);
                        var is_paid = "non payée";

                        if (payment.status == 1) {
                            is_paid = "payée";
                        }

                        var months = [
                            "janvier",
                            "fevrier",
                            "mars",
                            "avril",
                            "mai",
                            "juin",
                            "juillet",
                            "aout",
                            "septembre",
                            "octobre",
                            "novembre",
                            "décembre"
                        ];

                        html = '<html>'+
                            '<head>'+
                            '<style type="text/css">'+
                            'body, table {'+
                            'font-size: 12px;'+
                            '}'+
                            'table {'+
                            'border-collapse: collapse;'+
                            'border-spacing: 0;'+
                            '}'+
                            '.row {'+
                            'display: block;'+
                            'width: 100%;'+
                            '}'+
                            '.col-md-5, .col-md-6, .col-md-10 {'+
                            'display: inline-block;'+
                            'padding: 20px;'+
                            '}'+
                            '.col-md-5 {'+
                            'width: 32%;'+
                            '}'+
                            '.col-md-6 {'+
                            'width: 50%;'+
                            '}'+
                            '.col-md-10 {'+
                            'width: 83%;'+
                            '}'+
                            '.col-md-offset-1 {'+
                            'margin-left: 8%;'+
                            '}'+
                            '.text-center {'+
                            'text-align: center;'+
                            '}'+
                            'td {'+
                            'border: 1px solid #000;'+
                            'padding: 10px;'+
                            '}'+
                            '.clearfix {'+
                            'margin-top: 20px;'+
                            'margin-bottom: 20px;'+
                            '}'+
                            '</style>'+
                            '</head>'+
                            '<body>'+
                            '<div class="content command-pdf">'+
                            '<div class="row">'+
                            '<div class="col-md-6">'+
                            '<address>'+
                            'QosPlus<br>'+
                            '10, rue des mimosas<br>'+
                            '75007 Paris'+
                            '</address>'+
                            '<div class="clearfix"></div>'+
                            '<p>Facture N°'+id+'</p>' +
                            '<p>Total: '+payment.amount+'€ (facture '+is_paid+')</p>'+
                            '<p>Du le '+ date.getUTCDate() +' '+ months[date.getUTCMonth()] +' '+ date.getUTCFullYear()+'</p>'+
                            '</div>'+
                            '<div class="col-md-5 text-center">'+
                            '<address>'+
                            client.firstName +' '+ client.lastName +'<br>'+
                            client.mail + '<br><br>'+
                            shop.name + '<br>'+
                            shop.adress + '<br>'+
                            shop.zipCode + ' ' + shop.city + '<br>'+
                            '</address>'+
                            '</div>'+
                            '</div>';

                        for (var i = 0; i < command.product.length; i++) {
                            var product = command.product[i];
                            html += '<div class="row">'+
                                '<div class="col-md-10 text-center">'+
                                '<table>'+
                                '<thead>'+
                                '<td>Porteur</td>'+
                                '<td>Nom</td>'+
                                '<td>Sphère</td>'+
                                '<td>Qté.</td>'+
                                '</thead>'+
                                '<tr>'+
                                '<td>'+product.porter+'</td>'+
                                '<td>'+product.name+'</td>'+
                                '<td>'+product.item.sphere+'</td>'+
                                '<td>'+product.quantity+'</td>'+
                                '</tr>'+
                                '</table>'+
                                '</div>'+
                                '</div>';
                        }

                        html += '</div>'+
                            '</body>'+
                            '</html>';

                        var options = {
                            "html" : html,
                            "paperSize" : {format: 'A4', orientation: 'portrait', border: '1cm'},
                            "deleteOnAction" : true
                        };

                        pdf.convert(options, function(result) {
                            result.toFile(path, function() {
                                payment.facture = savedPath;
                                Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, command){
                                    if(err){
                                        console.log(err);
                                        logger.log('error', err);
                                        res.json({success: false, message:error});
                                    }
                                    res.json({success: true, message:"Facture updated", data:  command});
                                })
                            });
                        });
                    }
                });
            }
        });
    },

    changeCommandStatus: function(req, res) {
        var id = req.body.id;
        Command.findOne({_id: id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                if (command.status == 0) {
                    command.status = 1;
                    updatePaymentAndCommand(0);
                } else if (command.status == 1) {
                    command.status = 2;
                    updatePaymentAndCommand(0);
                } else {
                    command.status = 0;
                    updatePaymentAndCommand(1);
                }

                function updatePaymentAndCommand(status) {
                    Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function(err, command){
                        if(err) {
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        } else {
                            Payment.findOne({_id: command.payment}, function(err, payment){
                                if(err) {
                                    console.log(err);
                                    logger.log('error', err);
                                    res.json({success: false, message:err});
                                } else {
                                    payment.status = status;
                                    Payment.findOneAndUpdate({_id: command.payment}, payment, { 'new': true }, function(err, payment){
                                        if(err) {
                                            console.log(err);
                                            logger.log('error', err);
                                            res.json({success: false, message:err});
                                        } else {
                                            var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                                            fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                                                if (!err) fs.unlinkSync(path_facture);
                                        });
                                            res.json({success: true, message:"Command updated", data: command});
                                        }
                                    })
                                }
                            });
                        }
                    })
                }
            }
        })
    },

    deleteCommand: function(req, res) {
        var command = req.body.command;
        Command.findOneAndRemove({_id: command._id}, function (err, command) {
            if (err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message: err});
            } else {
                var path = "../myApp/public/pdf/"+command._id+".pdf";
                fs.access(path, fs.R_OK | fs.W_OK, (err) => {
                    if (!err) fs.unlinkSync(path);
                });
                Payment.findOneAndRemove({_id: command.payment}, function (err, payment) {
                    if (err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                        fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                            if (!err) fs.unlinkSync(path_facture);
                        });
                        res.json({success: true, message:"Command deleted", data: {}});
                    }
                });
            }
        });
    }
};