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

    getShops: function(req, res){
        var ids = req.body.ids;

        Shop.find({'_id': {$in: ids}}, function(error, shops){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Shop not Found", data:error});
            }
            res.json({success: true, message: "Shops found", data: shops})

        });
    },

    getAllShops: function(req, res){
        Shop.find({}, function(error, shops){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Shop not Found", data:error});
            }
            res.json({success: true, message: "Shops found", data: shops})

        });
    },



};
