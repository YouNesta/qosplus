/**
 * Created by Younes on 13/03/2016.
 */

var fs = require('fs');
var logger = require('winston');

module.exports = {
    logFolder: function(){
        var y = new Date();
        logger.add(logger.transports.File, { filename: ".logs"+"/"+y.getFullYear()+y.getMonth()+y.getDay()+"-"+y.getHours+'H.log' });
    }
}
