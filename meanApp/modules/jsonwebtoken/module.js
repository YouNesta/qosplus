/**
 * Created by Younes on 14/03/2016.
 */
var config = require('../../config/config');
var jwt    = require('jsonwebtoken');

module.exports = {
    setData :function(user){
        var data = {};
        data._id = user._id;
        data.mail = user.mail;
        data.role = user.role;
        var token = jwt.sign(data, config.secret, {
            expiresIn: 86400
        });
        console.log(data);

        return token;
    },
    getData: function(req){
            var base = req.headers['authorization'].split(" ");
            var data = jwt.verify(base[1], '4815-darma-162342');
           return data;
    }
};