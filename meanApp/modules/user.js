/**
 * Created by Younes on 13/03/2016.
 */
var crypto    = require('crypto');
var SHA256 = require("crypto-js/sha256");

module.exports = {

    generatePassword: function(_password){
        var buf = crypto.randomBytes(16);
        var txt = buf.toString('hex');
        var hash =  SHA256(password+txt);
        var password = hash.toString();
        var hash = txt;
        return {
            password: password,
            hash: hash
        };
    },

    isValidPassword: function(user, password){
        var hash =  SHA256(password+user._hash);
        var _password = hash.toString();
        return user._password == _password;
    }

}