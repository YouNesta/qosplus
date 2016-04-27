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
            var i = 0;
            getCommands(commands, i);
        });

        function getCommands(commands, i){
            res.json({success: true, message:"Command List Find with success", data:  commands});
        }
    },
};
