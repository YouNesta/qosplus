/**
 * Created by Younes on 13/03/2016.
 */
var crypto    = require('crypto');
var SHA256 = require("crypto-js/sha256");
var User = require("../models/user.js").User;
var Shop = require("../models/shop.js").Shop;
var logger = require('winston');

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
    },

    setUser: function(req, res){
        var user = new User(req.body.user);
        var shops = req.body.shops;
        user.state = 0;
        user.save(function(error) {
            if (error) {
                console.log(error);
                logger.log('error', error);
            }
            if (user) {
                if (req.body.option.director) {
                    //Is director
                    User.findOneAndUpdate({_id: user._id}, {$set: {director: user._id}}, function (error, user) {
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message: "Subscribe Failed", data: error});

                        }
                        setShop(user, shops);
                    })
                } else {
                    //is Pute
                    var Director = new User(req.body.director);

                    Director.save(function (error) {
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message: "Subscribe Failed", data: error});

                        }
                        user.director = Director._id;
                        User.findOneAndUpdate({_id: user._id}, {director: Director._id}, {upsert: true}, function (error, data) {
                            if (error) {
                                console.log(error);
                                logger.log('error', error);
                                res.json({success: false, message: "Subscribe Failed", data: error});

                            }
                            setShop(user, shops);
                        })
                    });
                }
            }

        })
        function setShop(user, shops){
            if(shops.length >= 1){
                var shop = new Shop(shops[0]);
                shop.save(function(error, shop){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                    }
                    User.findOneAndUpdate({_id: user._id}, {$push: { associateShop:  shop._id} }, { 'new': true },  function(error, data){
                        if(error){
                            console.log(error);
                            logger.log('error', error);
                            res.json({ success: false, message: "Subscribe Failed", data:error});
                        }
                        shops.shift();
                        setShop(data, shops);
                    })

                });
            }else{
                res.json({ success: true, message: "Subscribe Success", data:user});
            }

        }

    },

    getShop: function(user, shops){
        if(shops.length >=1){
            console.log(shops)
        }
    }
};
