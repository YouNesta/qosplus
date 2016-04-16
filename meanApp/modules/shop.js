/**
 * Created by Younes on 26/03/2016.
 */
var crypto    = require('crypto');
var SHA256 = require("crypto-js/sha256");
var User = require("../models/user.js").User;
var Shop = require("../models/shop.js").Shop;
var logger = require('winston');

module.exports = {





    getShop: function(user, shops){
        if(shops.length >=1){
            console.log(shops)
        }
    },



};
