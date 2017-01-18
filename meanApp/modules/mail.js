var crypto    = require('crypto');
var Mail = require("../models/mail/mail.js").Mail;
var MailData = require("../models/mail/mailData.js").MailData;
var User = require("../models/user.js").User;
var UserModule    = require('./user');
var logger = require('winston');
var mongo = require('mongodb');
var nodemailer = require('nodemailer');
var smtpConfig = require('../config/smtpConfig');
var mailLayout = require('../models/mail/layout');

const domain = "167.114.235.207";




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
                    var mailBody = ' ' +
                        '<!-- 1 Column Text : BEGIN --> ' +
                        '<tr> ' +
                        '<td bgcolor="#ffffff" style="padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">                 ' +
                        'Confirmation d\'inscription au site Hephilens:'+
                        '<br>'+
                        'votre mots de passe : '+password.clear+
                        '<br><br>'+
                        '<!-- Button : Begin -->'+
                        '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto">'+
                        '<tr>'+
                        '<td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">'+
                        '<a href="' +
                        'http://'+domain+'/login' +
                        '" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">'+
                        '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;">Connexion</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                        '</a>'+
                        '</td>'+
                        '</tr>'+
                        '</table>'+
                        '<!-- Button : END -->'+
                        '</td>'+
                        '</tr>'+
                        '<!-- 1 Column Text : BEGIN -->';

                    thus.send(mailBody, mail);
                }

                if(mail.type == 'addAdmin'){
                    var mailBody = ' ' +
                        '<!-- 1 Column Text : BEGIN --> ' +
                        '<tr> ' +
                        '<td bgcolor="#ffffff" style="padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">                 ' +
                        'Votre compte employé vient d\'être créé'+
                        '<br><br>'+
                        '<!-- Button : Begin -->'+
                        '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto">'+
                        '<tr>'+
                        '<td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">'+
                        '<a href="' +
                        'http://'+domain+'/login' +
                        '" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">'+
                        '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;">Connexion</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                        '</a>'+
                        '</td>'+
                        '</tr>'+
                        '</table>'+
                        '<!-- Button : END -->'+
                        '</td>'+
                        '</tr>'+
                        '<!-- 1 Column Text : BEGIN -->';
                    thus.send(mailBody, mail);
                }

                if(mail.type == "changePassword"){
                    var mailBody = ' ' +
                    '<!-- 1 Column Text : BEGIN --> ' +
                    '<tr> ' +
                    '<td bgcolor="#ffffff" style="padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">                 ' +
                    'Confirmation d\'inscription au site Hephilens:'+
                    '<br>'+
                    'votre mots de passe : '+mail.data.variable+
                    '<br><br>'+
                    '<!-- Button : Begin -->'+
                    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto">'+
                    '<tr>'+
                    '<td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">'+
                    '<a href="' +
                    'http://'+domain+'/login' +
                    '" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;">Connexion</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</a>'+
                    '</td>'+
                    '</tr>'+
                    '</table>'+
                    '<!-- Button : END -->'+
                    '</td>'+
                    '</tr>'+
                    '<!-- 1 Column Text : BEGIN -->';

                    thus.send(mailBody, mail);
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

        var mailBody = mailLayout.header;
         mailBody += variables;
        mailBody += mailLayout.footer;
        var mailOptions = {
            from: smtpConfig.auth.user, // sender address
            to: mail.data.to, // list of receivers
             subject: mail.data.object, // Subject line
            html: mailBody // html body || suposed to be: mail.data.variables
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