var crypto    = require('crypto');
var Mail = require("../models/mail/mail.js").Mail;
var MailData = require("../models/mail/mailData.js").MailData;
var User = require("../models/user.js").User;
var UserModule    = require('./user');
var logger = require('winston');
var mongo = require('mongodb');
var nodemailer = require('nodemailer');
var smtpConfig = require('../config/smtpConfig');

module.exports = {

    saveMail: function(req, res){
        var mail = new Mail(req.body.mail);
        var thus = this;

        mail.save(function(error){
            if (error) {
                console.log(error);
                logger.log('error', error);
                res.json({success: false, message: "Mail Failed to be saved", data: error})
            }else{
                if(mail.type == 'validateUser'){
                    var password = UserModule.generateClearPassword();
                    user = new User();
                    User.findOneAndUpdate({mail: mail.data.to}, {$set: {hash: password.hash, password: password.password}}, function(error, user){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message: "Subscribe Failed", data: error});
                        }
                    });
                    thus.send(password.clear, mail);
                }

                if(mail.type == 'addAdmin'){
                    thus.send("Votre compte employé vient d'être créé", mail);
                }
                res.json({success: true, message: "Mail saved!"});
            }
        })
    },

    generateTemplate: function(mail){
        //TODO
    },

    send: function(variables, mail){
        var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
            from: smtpConfig.auth.user, // sender address
            to: mail.data.to, // list of receivers
             subject: mail.data.object, // Subject line
            html: variables // html body || suposed to be: mail.data.variables
        };

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              mail.hasCrashed = true;
              logger.log('error', error);
          }else{
              console.log('Message sent: ' + info.response);
              mail.hasCrashed = false;
              mail.isSended = true;
          }
            mail.save(function(error){
                if (error) {
                    console.log(error);
                    logger.log('error', error);
                    res.json({success: false, meassge: 'sendFailed', error:error});
                }
            })
        })
    },

    sendNonSended: function(){
        var thus = this;
        Mail.find({isSended: false}, function(error, nonSendedMails){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "User Not Found", data:error});
            }
                nonSendedMails.forEach(function(mail){
                    thus.send("", mail);
                });

        });
        res.json({success: true, message: "User Found", data: user});
    },

    getCrashedMail: function () {
        var mail = new Mail();

        mail.find({hasCrashed: true}, function(error, mails){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "User Not Found", data:error});
            }
            res.json({ success: true, message: "User Found", data:mails});
        })
    }

};