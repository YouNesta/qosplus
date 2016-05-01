/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var Payment = require("../models/command/payment.js").Payment;
var Command = require("../models/command/command.js").Command;

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

    addCommand: function(req, res) {
        var payment = new Payment();
        payment.setParameter("date", new Date());
        var user = JSON.parse(localStorage.getItem("user"));
        payment.setParameter("client", user._id);
        payment.setParameter("IBAN", 12345678);
        payment.setParameter("status", 0);

        var command = new Command();
        command.setParameter("date", new Date());
        command.setParameter("product", req.body.cart);
        command.setParameter("status", 1);
        command.setParameter("payment", payment);
        console.log('Ok.');
        res.json({success: true, message:"Command Added with success", data:  []});
    }
};
