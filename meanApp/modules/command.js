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

        var payment = req.body.payment;
        var date = payment.date;
        var client = payment.client;
        var IBAN = payment.IBAN;
        var amount = payment.amount;

        Payment.findOne({client: client, date: date}, function(err, payment){
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            if (payment == null) {
                payment = new Payment();
                payment.amount = amount;
                payment.date = date;
                payment.client = client;
                payment.IBAN = IBAN;
                payment.facture = "";

                payment.save(function(error, payment){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                    } else {
                        createCommand(payment);
                    }
                });
            } else {
                var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                    if (!err) fs.unlinkSync(path_facture);
                });
                payment.facture = "";
                payment.amount += amount;
                Payment.findOneAndUpdate({_id: payment._id}, payment, { 'new': true }, function(err, payment){
                    if(err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message:err});
                    } else {
                        createCommand(payment);
                    }
                });
            }

            function createCommand(payment) {
                var command = new Command(req.body.command);
                console.log(payment);
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
                    'footer {' +
                    'text-align: center;' +
                    'font-weight: bold;' +
                    '}'+
                    '</style>'+
                    '</head>'+
                    '<body>'+
                    '<div class="content command-pdf">'+
                    '<div class="row">'+
                    '<div class="col-md-6">'+
                    '<address>'+
                    'X-VISION<br>'+
                    '54, boulevard Michel<br>'+
                    '75018 PARIS<br>'+
                    'Tél. : 01.53.39.19.30 '+
                    '</address>'+
                    '<div class="clearfix"></div>'+
                    '<p>Bon N°'+command._id+'</p>'+
                    '<p>Porteur: '+command.porter+'</p>'+
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
                    if (product.item.cylinder != null) {
                        options += "cylindre: "+ product.item.cylinder + "<br>";
                    }
                    if (product.item.axis != null) {
                        options += "axe: "+ product.item.axis + "<br>";
                    }
                    if (product.item.addition != null) {
                        options += "addition: "+ product.item.addition + "<br>";
                    }
                    if (product.item.diameter != null) {
                        options += "diameter: "+ product.item.diameter + "<br>";
                    }
                    if (product.item.radius != null) {
                        options += "rayon: "+ product.item.radius + "<br>";
                    }


                    html += '<div class="row">'+
                        '<div class="col-md-12 text-center">'+
                        '<table>'+
                        '<thead>'+
                        '<td>Code Produit</td>'+
                        '<td>Nom</td>'+
                        '<td>Oeil</td>'+
                        '<td>Sphère</td>'+
                        '<td>Qté.</td>'+
                        '</thead>'+
                        '<tr>'+
                        '<td>'+product.reference+'</td>'+
                        '<td>'+product.name+'</td>'+
                        '<td>'+product.eye+'</td>'+
                        '<td> sphere: '+product.item.sphere+'<br>' +
                            options +
                        'hydrophilie: '+ product.hydrophily+ '<br>' +
                        '</td>'+
                        '<td>'+product.quantity+'</td>'+
                        '</tr>'+
                        '</table>'+
                        '</div>'+
                        '</div>';
                }

                html += '</div>'+
                    '<hr>' +
                    '<footer>' +
                    shop.name + ', ' + shop.adress + ' ' + shop.zipCode + ' ' + shop.city + '<br>' +
                    'Siret: ' + shop.siret +
                    '</footer>'+
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
        var status = req.body.status;
        var updated = 0;
        console.log(id);
        Payment.findOne({_id: id}, function(err, payment){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                console.log(payment);
                payment.status = status;
                if (payment.status == 1) {
                    updateCommandAndPayment(0);
                } else {
                    updateCommandAndPayment(2);
                }

                function updateCommandAndPayment(status) {
                    Command.find({payment: payment._id}, function(err, commands){
                        if(err) {
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        } else {

                            for (var i in commands) {

                                var command = commands[i];
                                command.status = status;

                                Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function(err, command){
                                    if(err) {
                                        console.log(err);
                                        logger.log('error', err);
                                        res.json({success: false, message:err});
                                    } else {
                                        newUpdated();
                                    }
                                })
                            }

                            function newUpdated() {
                                updated++;

                                if (updated == commands.length) {
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
                            }

                        }
                    });
                }
            }
        })
    },

    printFacture: function(req, res) {
        var payment = req.body.payment;
        var id = payment._id;
        Command.find({payment: id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                var path = "../myApp/public/pdf/"+id+".pdf";
                var savedPath = "/public/pdf/"+id+".pdf";
                var html = "<p>Error</p>";
                var shop = command[0].shop;

                User.findOne({mail: command[0].client}, function(err, client){
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
                            '}' +
                            'footer {' +
                            'text-align: center;' +
                            'font-weight: bold;' +
                            '}'+
                            '</style>'+
                            '</head>'+
                            '<body>'+
                            '<div class="content command-pdf">'+
                            '<div class="row">'+
                            '<div class="col-md-6">'+
                            '<address>'+
                            'X-VISION<br>'+
                            '54, boulevard Michel<br>'+
                            '75018 PARIS<br>'+
                            'Tél. : 01.53.39.19.30 '+
                            '</address>'+
                            '<div class="clearfix"></div>'+
                            '<p>Facture N°'+id+'</p>' +
                            '<p>Total: '+payment.amount+'€ (facture '+is_paid+')</p>'+
                            //'<p>Porteur: '+command.porter+'</p>'+
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

                        for (var j = 0; j < command.length; j++) {
                            for (var i = 0; i < command[j].product.length; i++) {
                                var product = command[j].product[i];
                                var command_date = new Date(command[j].date);
                                html += '<div class="row">'+
                                    '<div class="col-md-10 text-center">'+
                                    '<table>'+
                                    '<thead>'+
                                    '<td>Nom</td>'+
                                    '<td>Sphère</td>'+
                                    '<td>Qté.</td>'+
                                    '<td>Prix commande</td>'+
                                    '<td>Magasin associé</td>'+
                                    '<td>Date</td>'+
                                    '</thead>'+
                                    '<tr>'+
                                    '<td>'+product.name+'</td>'+
                                    '<td>'+product.item.sphere+'</td>'+
                                    '<td>'+product.quantity+'</td>'+
                                    '<td>'+command[j].amount+'€ </td>'+
                                    '<td>'+command[j].shop.name+'</td>'+
                                    '<td>'+command_date.getDate()+ ' ' + months[command_date.getMonth()] + ' ' + command_date.getFullYear() + '</td>'+
                                    '</tr>'+
                                    '</table>'+
                                    '</div>'+
                                    '</div>';
                            }
                        }

                        html += '</div>' +
                            '<hr>' +
                            '<footer>' +
                            shop.name + ', ' + shop.adress + ' ' + shop.zipCode + ' ' + shop.city + '<br>' +
                            'Siret: ' + shop.siret +
                            '</footer>'+
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
                                Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, payment){
                                    if(err){
                                        console.log(err);
                                        logger.log('error', err);
                                        res.json({success: false, message:error});
                                    }
                                    res.json({success: true, message:"Facture updated", data:  payment});
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
        var status = req.body.status;
        Command.findOne({_id: id}, function(err, command){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                command.status = status;
                if (command.status == 1) {
                    updatePaymentAndCommand(0);
                } else if (command.status == 2) {
                    updatePaymentAndCommand(0);
                }  else if (command.status == 3) {
                    updatePaymentAndCommand(0);
                } else {
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
                                    var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                                    fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                                        if (!err) fs.unlinkSync(path_facture);
                                    });
                                    res.json({success: true, message:"Command updated", data: command});
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
                Payment.findOne({_id: command.payment}, function (err, payment) {
                    if (err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                        fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                            if (!err) fs.unlinkSync(path_facture);
                        });
                        payment.facture = "";
                        payment.amount -= command.amount;
                        Payment.findOneAndUpdate({_id: command.payment}, payment, { 'new': true }, function(err, payment){
                            if(err) {
                                console.log(err);
                                logger.log('error', err);
                                res.json({success: false, message:err});
                            } else {
                                res.json({success: true, message:"Command deleted", data: {}});
                            }
                        })
                    }
                });
            }
        });
    }
};