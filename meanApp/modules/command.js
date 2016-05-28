/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;
var User = require("../models/user.js").User;
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

    getPayments: function(req, res) {
        Payment.find({}, function(err, payments) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:error});
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
        var id = command._id;
        var path = "../myApp/public/pdf/"+id+".pdf";
        var savedPath = "/public/pdf/"+id+".pdf";
        var html = "<p>Error</p>";

        User.findOne({mail: command.client}, function(err, client){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:err});
            } else {

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
                    '.col-md-10 {'+
                    'width: 90%;'+
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
                    '<p>Bon N°'+command._id+'</p>'+
                    '<p>'+ date.getUTCDate() +'/'+ (parseInt(date.getUTCMonth()) + 1) +'/'+ date.getUTCFullYear()+'</p>'+
                    '</div>'+
                    '<div class="col-md-5 text-center">'+
                    '<address>'+
                    client.firstName + client.lastName +'<br>'+
                    client.mail + '<br>'+
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
                        '<div class="col-md-10 text-center">'+
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
                                res.res.json({success: false, message:error});
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
                res.res.json({success: false, message:err});
            } else {
                res.json({success: true, message:"Command find with success", data: command});
            }
        })
    },

    validatePayment: function(req, res) {
        var id = req.params.id;
        Payment.findOne({_id: id}, function(err, payment){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:err});
            } else {
                payment.status = 1;
                Payment.findOneAndUpdate({_id: id}, payment, { 'new': true }, function(err, payment){
                    if(err) {
                        console.log(err);
                        logger.log('error', err);
                        res.res.json({success: false, message:err});
                    } else {
                        res.json({success: true, message:"Payment updated", data: payment});
                    }
                })
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
                res.res.json({success: false, message:err});
            } else {
                var path = "../myApp/public/pdf/"+id+".pdf";
                var savedPath = "/public/pdf/"+id+".pdf";
                var html = "<p>Error</p>";

                User.findOne({mail: command.client}, function(err, client){
                    if(err) {
                        console.log(err);
                        logger.log('error', err);
                        res.res.json({success: false, message:err});
                    } else {

                        var date = new Date(payment.date);
                        var is_paid = "non payée";

                        if (payment.status == 1) {
                            is_paid = "payée";
                        }

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
                            '<p>Facture N°'+id+' ('+is_paid+')</p>'+
                            '<p>'+ date.getUTCDate() +'/'+ (parseInt(date.getUTCMonth()) + 1) +'/'+ date.getUTCFullYear()+'</p>'+
                            '</div>'+
                            '<div class="col-md-5 text-center">'+
                            '<address>'+
                            client.firstName + client.lastName +'<br>'+
                            client.mail + '<br>'+
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
                                '<td>Prix</td>'+
                                '</thead>'+
                                '<tr>'+
                                '<td>'+product.porter+'</td>'+
                                '<td>'+product.name+'</td>'+
                                '<td>'+product.item.sphere+'</td>'+
                                '<td>'+product.quantity+'</td>'+
                                '<td>'+product.price.price+'</td>'+
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
                                        res.res.json({success: false, message:error});
                                    }
                                    res.json({success: true, message:"Facture updated", data:  command});
                                })
                            });
                        });
                    }
                });
            }
        });
    }
};