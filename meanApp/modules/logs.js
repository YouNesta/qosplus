/**
 * Created by Younes on 13/03/2016.
 */

var fs = require('fs');
var logger = require('winston');

module.exports = {
    logFolder: function(){
        var y = new Date();
        logger.add(logger.transports.File, { filename: ".logs"+"/"+y.getFullYear()+y.getMonth()+y.getDay()+"-"+y.getHours+'H.log' });
    },
    mkdir: function(){
        var dir = './logs';
        var y = new Date();
        var param = [y.getFullYear(), y.getMonth(),y.getDate()];
        var lastItem = null;
        param.forEach(function(item, e) {
            if(lastItem == param[e - 1]){
                dir+= "/"+item;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
            }else{
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
            }
            lastItem = item;
        });

        return dir;
    }

}
