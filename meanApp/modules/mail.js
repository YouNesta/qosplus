var crypto    = require('crypto');
var Mail = require("../models/mail/mail.js").User;
var MailData = require("../models/mail/mailData.js").Shop;
var logger = require('winston');
var mongo = require('mongodb');
var nodemailer = require('nodemailer');

module.exports = {

    saveMail: function(req, res){
        var mail = new Mail(req.body.mailSender);

        mail.save(function(error){
            if (error) {
                console.log(error);
                logger.log('error', error);
                res.json({success: false, message: "Mail Failed to be saved", data: error})
            }
            res.json({success: true, message: "Mail saved!"})
        })
    },

    sendMail: function(type, mail){
        var transporter = nodemailer.createTransport();

        var mailOptions = {
            from: 'default', // sender address
            to: mail.data.to, // list of receivers
            subject: mail.data.object, // Subject line
            html: mail.data.content // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              mail.hasCrashed = true;
              logger.log('error', error);
          }else{
              console.log('Message sent: ' + info.response);
              mail.isSended = true;
          }
            var updatedMail = new Mail(mail);
            updatedMail.save(function(error){
                if (error) {
                    console.log(error);
                    logger.log('error', error);
                }
            })
        })
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