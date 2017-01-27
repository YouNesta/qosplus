/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
var Discount = require("../models/command/discount.js").Discount;
var Product = require("../models/product/product.js").Product;
var Item = require("../models/product/item.js").Item;
var User = require("../models/user.js").User;
var pdf = require('html-pdf');
var logger = require('winston');
var http = require('http');
var fs = require('fs');
var Path = require('path');

module.exports = {

    getCommands: function(req, res) {
        Command.find({}, function(err, commands) {
            if(err){
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Command List Find with success", data:  commands});
        });
    },

    getPayments: function(req, res) {
        Payment.find({}, function(err, payments) {
            if(err){
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
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Command List Find with success", data:  commands});
        })
    },

    addCommand: function(req, res) {

        Command.find({}, function(err, commands) {
            if (err) {
                logger.log('error', err);
                res.json({success: false, message: error});
            }

            var command = new Command(req.body.command);
            command.commandNumber = commands.length + 1;
            command.status = 2;
            command.discount = "";
            command.save(function(error, command){
                if(error){
		    console.log(error);
	            res.json({success: false, message:error});
                    logger.log('error', error);
                } else {
                    res.json({success: true, message:"Command Added with success", data:  []});
                }
            });
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

                var status = "payée";

                switch (command.status) {
                    case 1:
                        status = "non validée";
                        break;
                    case 2:
                        status = "en attente de paiement";
                        break;
                    case 3:
                        status = "annulée";
                        break;
                }

                var date = new Date(command.date);
                html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
                    '<html xmlns="http://www.w3.org/1999/xhtml">'+
                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                    '<head>'+
                    '<style type="text/css">'+
                    '* { margin: 0; padding: 0; }'+
                    'body { font: 14px/1.4 Georgia, serif; }'+
                    '#page-wrap { width: 95%; margin: 0 auto; }'+
                    'textarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }'+
                    'table { border-collapse: collapse; }'+
                    'table td, table th { border: 1px solid black; padding: 5px; }'+
                    '#header { height: 15px; width: 100%; margin: 20px 0; background: #222; text-align: center; color: white; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 8px 0px; }'+
                    '#address { width: 250px; height: 150px; float: left; }'+
                    '#customer { overflow: hidden; }'+
                    '#logo {font-size: 30px; font-weight: bold; text-align: right; float: right; position: relative; margin-top: 25px; max-width: 540px; max-height: 100px; overflow: hidden; }'+
                    '#customer-title {font-size: 10px; height: 80px; font-weight: bold; float: left; }'+
                    '#meta { margin-top: 1px; width: 300px; float: right; }'+
                    '#meta td { text-align: right;  }'+
                    '#meta td.meta-head { text-align: left; background: #eee; }'+
                    '#meta td textarea { width: 100%; height: 20px; text-align: right; }'+
                    '#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }'+
                    '#items th { background: #eee; }'+
                    '#items textarea { width: 80px; height: 50px; }'+
                    '#items tr.item-row td { border: 0; vertical-align: top; }'+
                    '#items td.description { width: 300px; }'+
                    '#items td.item-name { width: 175px; }'+
                    '#items td.description textarea, #items td.item-name textarea { width: 100%; }'+
                    '#items td.total-line { border-right: 0; text-align: right; }'+
                    '#items td.total-value { border-left: 0; padding: 10px; }'+
                    '#items td.total-value textarea { height: 20px; background: none; }'+
                    '#items td.balance { background: #eee; }'+
                    '#items td.blank { border: 0; }'+
                    '</style>'+
                    '</head>'+
                    '<body>'+
                    '<div id="page-wrap">'+
                    '<textarea id="header">COMMANDE</textarea>'+
                    '<div id="identity">'+
                    '<textarea id="address">X-VISION\n'+
                    '54, boulevard Michel\n'+
                    '75018 PARIS\n'+
                    'Tél. : 01.53.39.19.30</textarea>'+
                    '<div id="logo">X-Vision</div></div>'+
                    '<div style="clear:both"></div>'+
                    '<div id="customer">'+
                    '<textarea id="customer-title">'+ client.firstName +' '+ client.lastName + ",\n" +
                    shop.adress + '\n'+
                    shop.zipCode + ' ' + shop.city +
                    '\nSiret: ' + shop.siret + '</textarea>'+
                    '<table id="meta"><tr>'+
                    '<td class="meta-head">Bon N°</td>'+
                    '<td><textarea>' + command.commandNumber + '</textarea></td>'+
                    '</tr><tr>'+
                    '<td class="meta-head">Date</td>'+
                    '<td><textarea id="date">' + date.getUTCDate() +' '+ months[date.getUTCMonth()] +' '+ date.getUTCFullYear() + '</textarea></td>'+
                    '</tr><tr><td class="meta-head">Porteur</td>'+
                    '<td><textarea id="date">' + command.porter + '</textarea></td>'+
                    '</tr><tr>'+
                    '<td class="meta-head">Status</td>'+
                    '<td><div class="due">' + status + '</div></td>'+
                    '</tr></table></div><table id="items">'+
                    '<tr><th>Code Produit</th><th>Nom</th><th>Oeil</th><th>Sphere</th><th>Qté.</th></tr>';

                for (var i = 0; i < command.product.length; i++) {
                    var product = command.product[i];

                    var options = "\n";
                    if (product.item.cylinder != null) {
                        options += "cylindre: "+ product.item.cylinder + "\n";
                    }
                    if (product.item.axis != null) {
                        options += "axe: "+ product.item.axis + "\n";
                    }
                    if (product.item.addition != null) {
                        options += "addition: "+ product.item.addition + "\n";
                    }
                    if (product.item.diameter != null) {
                        options += "diameter: "+ product.item.diameter + "\n";
                    }
                    if (product.item.radius != null) {
                        options += "rayon: "+ product.item.radius + "\n";
                    }

                    html += '<tr class="item-row">'+
                        '<td class="item-name"><div class="delete-wpr"><textarea>' + product.reference + '</textarea></div></td>'+
                        '<td class="cost"><textarea>' + product.name + '</textarea></td>'+
                        '<td><textarea class="description">' + product.eye + '</textarea></td>'+
                        '<td><textarea class="qty">' + product.item.sphere + options + '\n hydrophilie: '+ product.hydrophily + '</textarea></td>'+
                        '<td><span class="price">' + product.quantity + '</span></td>'+
                        '</tr>';
                }

                html += '</table></div></body></html>';

                var options = {
                    "paperSize" : {format: 'Letter', orientation: 'portrait', border: '1cm'}
                };

                path = Path.join(__dirname, '..', path);
                pdf.create(html, options).toFile(path, function(err, result) {

                    if (!err) {
                        command.commandForm = savedPath;
                        Command.findOneAndUpdate({_id: id}, command, { 'new': true }, function(err, command){
                            if(err){
                                logger.log('error', err);
                                res.json({success: false, message:err});
                            }
                            res.json({success: true, message:"Command updated", data:  command});
                        })
                    } else {
                        console.log(err)
                        res.json({success: false, message:"Error", err:  err});
                    }
                });
            }
        });

    },

    getOneCommand: function(req, res) {
        Command.findOne({_id: req.params.id}, function(err, command){
            if(err) {
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
        Payment.findOne({_id: id}, function(err, payment){
            if(err) {
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                payment.status = status;
                if (payment.status == 1) {
                    updateCommandAndPayment(0);
                } else {
                    updateCommandAndPayment(2);
                }

                function updateCommandAndPayment(status) {
                    var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                    fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                        if (!err) fs.unlinkSync(path_facture);
                    });
                    Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, payment){
                        if(err) {
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        } else {
                            res.json({success: true, message:"Payment updated", data: payment});
                        }
                    })
                }
            }
        })
    },

    generateDiscount: function(req, res) {
        var command = req.body.command;

        var discount = new Discount();
        discount.percent = req.body.percent;

        discount.save(function(error, discount){
            if(error){
                logger.log('error', error);
            } else {
                Command.findOne({_id: command._id}, function(err, command){
                    if(err) {
                        logger.log('error', err);
                        res.json({success: false, message:err});
                    } else {

                        discount.amount = command.amount * (discount.percent / 100);
                        command.discount = discount._id;

                        command.save(function(error, command){
                            if(error){
                                logger.log('error', error);
                            } else {
                                Payment.findOne({client: command.client, status: false}, function(err, payment){
                                    if(err) {
                                        logger.log('error', err);
                                        res.json({success: false, message:err});
                                    } else {
                                        payment.amount -= discount.amount;
                                        payment.save(function(error, payment){
                                            if(error){
                                                logger.log('error', error);
                                            } else {
                                                discount.facture = payment._id;
                                                    discount.save(function(error, discount){
                                                        if(error){
                                                            logger.log('error', error);
                                                        } else {
                                                            res.json({success: true, message:"Discount created", data: command});
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                })
                            }
                        });

                    }
                })
            }
        });
    },

    printFacture: function(req, res) {
        var payment = req.body.payment;
        var id = payment._id;
        Command.find({payment: id, status: 0}, function(err, command){
            if(err) {
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                Discount.find({facture: id}, function(err, discounts){
                    if(err) {
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        if (command.length == 0) {
                            res.json({success: false, message:"aucune commande associée"});
                            return;
                        }
                        var path = "../myApp/public/pdf/"+id+".pdf";
                        var savedPath = "/public/pdf/"+id+".pdf";
                        var html = "<p>Error</p>";
                        var shop = command[0].shop;

                        User.findOne({mail: command[0].client}, function(err, client){
                            if(err) {
                                logger.log('error', err);
                                res.json({success: false, message:err});
                            } else {
                                var date = new Date();
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

                                var amount = 0;

                                for (var j = 0; j < command.length; j++) {
                                    var commands = command[j];
                                    amount += commands.amount;
                                }

                                for (var j = 0; j < discounts.length; j++) {
                                    var discount = discounts[j];
                                    amount -= discount.amount;
                                }
                                payment.amount = amount;

                                html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
                                    '<html xmlns="http://www.w3.org/1999/xhtml">'+
                                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                                    '<head>'+
                                    '<style type="text/css">'+
                                    '* { margin: 0; padding: 0; }'+
                                    'body { font: 14px/1.4 Georgia, serif; }'+
                                    '#page-wrap { width: 95%; margin: 0 auto; }'+
                                    'textarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }'+
                                    'table { border-collapse: collapse; }'+
                                    'table td, table th { border: 1px solid black; padding: 5px; }'+
                                    '#header { height: 15px; width: 100%; margin: 20px 0; background: #222; text-align: center; color: white; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 8px 0px; }'+
                                    '#address { width: 250px; height: 150px; float: left; }'+
                                    '#customer { overflow: hidden; }'+
                                    '#logo {font-size: 30px; font-weight: bold; text-align: right; float: right; position: relative; margin-top: 25px; max-width: 540px; max-height: 100px; overflow: hidden; }'+
                                    '#customer-title {font-size: 10px; height: 80px; font-weight: bold; float: left; }'+
                                    '#meta { margin-top: 1px; width: 300px; float: right; }'+
                                    '#meta td { text-align: right;  }'+
                                    '#meta td.meta-head { text-align: left; background: #eee; }'+
                                    '#meta td textarea { width: 100%; height: 20px; text-align: right; }'+
                                    '#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }'+
                                    '#items th { background: #eee; }'+
                                    '#items textarea { width: 80px; height: 50px; }'+
                                    '#items tr.item-row td { border: 0; vertical-align: top; }'+
                                    '#items td.description { width: 300px; }'+
                                    '#items td.item-name { width: 175px; }'+
                                    '#items td.description textarea, #items td.item-name textarea { width: 100%; }'+
                                    '#items td.total-line { border-right: 0; text-align: right; }'+
                                    '#items td.total-value { border-left: 0; padding: 10px; }'+
                                    '#items td.total-value textarea { height: 20px; background: none; }'+
                                    '#items td.balance { background: #eee; }'+
                                    '#items td.blank { border: 0; }'+
                                    '</style>'+
                                    '</head>'+
                                    '<body>'+
                                    '<div id="page-wrap">'+
                                    '<textarea id="header">FACTURE</textarea>'+
                                    '<div id="identity">'+
                                    '<textarea id="address">X-VISION\n'+
                                    '54, boulevard Michel\n'+
                                    '75018 PARIS\n'+
                                    'Tél. : 01.53.39.19.30</textarea>'+
                                    '<div id="logo">X-Vision</div></div>'+
                                    '<div style="clear:both"></div>'+
                                    '<div id="customer">'+
                                    '<textarea id="customer-title">'+ client.firstName +' '+ client.lastName + ",\n" +
                                    shop.adress + '\n'+
                                    shop.zipCode + ' ' + shop.city +
                                    '\nSiret: ' + shop.siret + '</textarea>'+
                                    '<table id="meta"><tr>'+
                                    '<td class="meta-head">Invoice #</td>'+
                                    '<td><textarea>' + payment.paymentNumber + '</textarea></td>'+
                                    '</tr><tr>'+
                                    '<td class="meta-head">Date</td>'+
                                    '<td><textarea id="date">' + date.getUTCDate() +' '+ months[date.getUTCMonth()] +' '+ date.getUTCFullYear() + '</textarea></td>'+
                                    '</tr><tr>'+
                                    '<td class="meta-head">Amount Due</td>'+
                                    '<td><div class="due">' + amount + '€ (facture ' + is_paid + ')</div></td>'+
                                    '</tr></table></div><table id="items">'+
                                    '<tr><th>Nom</th><th>Sphere</th><th>Magasin</th><th>Qté.</th><th>Prix</th></tr>';

                                for (var j = 0; j < command.length; j++) {
                                    for (var i = 0; i < command[j].product.length; i++) {
                                        var product = command[j].product[i];
                                        var command_date = new Date(command[j].date);
                                        html += '<tr class="item-row">'+
                                            '<td class="item-name"><div class="delete-wpr"><textarea>' + product.name + '</textarea></div></td>'+
                                            '<td class="cost"><textarea>' + product.item.sphere + '</textarea></td>'+
                                            '<td><textarea class="description">' + command[j].shop.name + '</textarea></td>'+
                                            '<td><textarea class="qty">' + product.quantity + '</textarea></td>'+
                                            '<td><span class="price">' + command[j].amount + '€</span></td>'+
                                            '</tr>';
                                    }
                                }
                                for (var j = 0; j < discounts.length; j++) {
                                    var discount = discounts[j];
                                    html += '<tr class="item-row">'+
                                        '<div class="col-md-10 text-center">'+
                                        '<td class="item-name"><div class="delete-wpr"><textarea>Discount</textarea></div></td>'+
                                        '<td class="description"><textarea></textarea></td>'+
                                        '<td><textarea class="cost"></textarea></td>'+
                                        '<td><textarea class="qty"></textarea></td>'+
                                        '<td><span class="price">' + discount.amount + '€ (' + discount.percent + '%)</span></td>'+
                                        '</tr>';
                                }

                                html += '</table></div></body></html>';

                                var options = {
                                    "paperSize" : {format: 'Letter', orientation: 'portrait', border: '1cm'}
                                };
                                path = Path.join(__dirname, '..', path);
                                pdf.create(html, options).toFile(path, function(err, result) {
                                    if (!err) {
                                        payment.facture = savedPath;
                                        Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, payment){
                                            if(err){
                                                logger.log('error', err);
                                                res.json({success: false, message:error});
                                            }
                                            res.json({success: true, message:"Facture updated", data:  payment});
                                        })
                                    } else {
                                        res.json({success: false, message:"Error", err: err});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    changeCommandStatus: function(req, res) {
        var id = req.body.id;
        var status = req.body.status;
        var done = false;
        Command.findOne({_id: id}, function(err, command){
            if(err) {
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                var lastStatus = command.status;
                command.status = status;
                var date = command.date;
                var m = date.getMonth();
                var y = date.getFullYear();
                if (date.getDate() >= 15) {
                    m++;
                }
                var paymentDate = new Date(y, m, 15);

                if (command.status == 0) {
                    chooseIfUpdateFacture();

                    // changeQuantity(-1);
                } else {
                    chooseIfUpdateFacture();
                }

                function changeQuantity(moreOrLess) {
                    for (var i in command.product) {
                        var item = command.product[i].item;
                        var quantity = command.product[i].quantity;
                        var reference = command.product[i].reference;

                        Item.findOne({_id: item._id}, function (err, found_item) {
                            if (err) {
                                logger.log('error', err);
                                res.json({success: false, message: err});
                            } else {
                                for (var j in found_item.sphere) {
                                    if (found_item.sphere[j].reference == reference) {
                                        var stock = found_item.sphere[j].stock;
                                        if (stock != -1) {
                                            found_item.sphere[j].stock = stock + (quantity * moreOrLess);
                                            if (found_item.sphere[j].stock < 0) found_item.sphere[j].stock = 0;
                                        }
                                    }
                                }

                                Item.findOneAndUpdate({_id: found_item._id}, found_item, { 'new': true }, function(err, saved_item){
                                    if(err) {
                                        logger.log('error', err);
                                        res.json({success: false, message:err});
                                    } else {
                                        if (i == command.product.length - 1 && !done) {
                                            done = true;
                                            chooseIfUpdateFacture();
                                        }
                                    }
                                });
                            }
                        });
                    }
                }

                function chooseIfUpdateFacture() {
                    if (command.status == 0) {
                        Payment.findOne({client: command.client, date: paymentDate, status: false}, function(err, payment) {
                            if (err) {
                                logger.log('error', err);
                                res.json({success: false, message: error});
                            }
                            if (payment == null) {

                                Payment.find({}, function (err, payments) {
                                    if (err) {
                                        logger.log('error', err);
                                        res.json({success: false, message: error});
                                    }

                                    payment = new Payment();
                                    payment.amount = command.amount;
                                    payment.date = paymentDate;
                                    payment.client = command.client;
                                    payment.IBAN = command.IBAN;
                                    payment.facture = "";
                                    payment.status = false;
                                    payment.paymentNumber = payments.length + 1;

                                    payment.save(function (error, payment) {
                                        if (error) {
                                            logger.log('error', error);
                                        } else {
                                            command.payment = payment._id;
                                            saveCommand();
                                        }
                                    });
                                });

                            } else {
                                var path_facture = "../myApp/public/pdf/" + payment._id + ".pdf";
                                fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                                    if (!err) fs.unlinkSync(path_facture);
                            });
                                payment.facture = "";
                                payment.amount += command.amount;
                                payment.save(function (error, payment) {
                                    if (error) {
                                        logger.log('error', error);
                                    } else {
                                        command.payment = payment._id;
                                        saveCommand();
                                    }
                                });
                            }
                        });
                    } else {
                        saveCommand()
                    }
                }

                function saveCommand() {
                    command.save(function(error, command){
                        if(error){
                            logger.log('error', error);
                        } else {
                            res.json({success: true, message:"Command Added with success", data:  []});
                        }
                    });
                }
            }
        })
    },

    deleteCommand: function(req, res) {
        var command = req.body.command;
        Command.findOne({_id: command._id}, function (err, command) {
            if (err) {
                logger.log('error', err);
                res.json({success: false, message: err});
            }
            command.status = 3;
            command.payment = "";
            var paymentId = command.payment;
            if (paymentId == "") {
                Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function (err, command) {
                    if (err) {
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        res.json({success: true, message:"Command deleted", data: {}});
                    }
                });
            } else {
                Payment.findOne({_id: paymentId}, function (err, payment) {
                    if (err) {
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        Command.findOneAndUpdate({_id: command._id}, command, { 'new': true }, function (err, command) {
                            if (err) {
                                logger.log('error', err);
                                res.json({success: false, message: err});
                            } else {
                                var path_facture = "../myApp/public/pdf/"+payment._id+".pdf";
                                fs.access(path_facture, fs.R_OK | fs.W_OK, (err) => {
                                    if (!err) fs.unlinkSync(path_facture);
                            });
                                payment.facture = "";
                                payment.amount -= command.amount;
                                Payment.findOneAndUpdate({_id: paymentId}, payment, { 'new': true }, function(err, payment){
                                    if(err) {
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
        });
    }
};
