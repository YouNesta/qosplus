var mongoose = require('mongoose');
var config = require('../../config/config');
var logger = require('winston');


module.exports = {
    connect :function(){
        return  mongoose.connect('mongodb://'+config.DB_URL+':27017/'+config.DB_NAME);
    },
    event :function(){
        mongoose.connection.on('connected', function () {
            logger.log('info','Mongoose default connection open to ' + config.DB_NAME);
        });

        mongoose.connection.on('error',function (err) {
            logger.log('error','Mongoose default connection error: ' + err);
        });

        mongoose.connection.on('disconnected', function () {
            logger.log('warn','Mongoose default connection disconnected');
        });

        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                logger.log('info', 'Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

    }
};