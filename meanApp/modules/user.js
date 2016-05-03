/**
 * Created by Younes on 13/03/2016.
 */
var crypto    = require('crypto');
var SHA256 = require("crypto-js/sha256");
var User = require("../models/user.js").User;
var Command = require("../models/command/command.js");
var Payment = require("../models/command/payment.js");
var Shop = require("../models/shop.js").Shop;
var logger = require('winston');
var generatePassword = require('password-generator');


module.exports = {

    generatePassword: function(password){
        var buf = crypto.randomBytes(16);
        var txt = buf.toString('hex');
        var hash =  SHA256(password+txt);
        var password = hash.toString();
        return {
            password: password,
            hash: txt
        };
    },

    isValidPassword: function(user, password){
        var hash =  SHA256(password+user.hash);
        var _password = hash.toString();
        return user.password == _password;
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

        });
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

    update: function(req, res){
        var i = 0;

        if(req.body.user.state == 0){
            var password = generatePassword(6, false);
            var crypted  = this.generatePassword(password);
            req.body.user.password = crypted.password;
            req.body.user.hash = crypted.hash;
            req.body.user.state = 1;
            console.log(password);
        }

        updateShop(req.body.user, i);
        function updateUser(user, i){
            if(user._id == user.director._id){
                user.director = user.director._id;
                User.findOneAndUpdate({_id: user._id}, {$set: user }, { 'new': true },  function(error, data){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                });
            }else{

                delete user.director.__v;
                User.findOneAndUpdate({_id: user.director._id}, user.director, { 'new': true },  function(error, data){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    User.findOneAndUpdate({_id: user._id}, {$set: user }, { 'new': true },  function(error, data){
                        if(error){
                            console.log(error);
                            logger.log('error', error);
                            res.json({ success: false, message: "Subscribe Failed", data:error});
                        }
                    });
                });
            }
        }
        function updateShop(user, i){
            if(i < user.associateShop.length) {
                delete user.associateShop[i].__v;

                Shop.findOneAndUpdate({_id: user.associateShop[i]._id}, {$set: user.associateShop[i] }, { 'new': true },  function(error, shop){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    user.associateShop[i] = shop._id;
                    console.log(shop);
                    i++;
                    updateShop(user, i);
                });


            }else{
                updateUser(user);
            }
        }
    },

    getProfile: function(req, res){
        var i = 0;
        var user = req.body.user;

        findShop(user, i);
        function findUser(user){
            User.find({_id: user._id}, function(error, user){
                if(error){
                    console.log(error);
                    logger.log('error', error);
                    res.json({ success: false, message: "User Not Found", data:error});
                }
                res.json({ success: true, message: "User Found", data:user});
            })
        }

        function findShop(user, i){
            if(i < user.associateShop.length) {
                delete user.associateShop[i].__v;

                Shop.find({_id: user.associateShop[i]._id}, function(error, shop){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    user.associateShop[i] = shop._id;
                    console.log(shop);
                    i++;
                    findShop(user, i);
                });


            }else{
                findUser(user);
            }
        }

    },

    getUserCommands: function(req, res){
        var user_Id = req.body.user._id;
        Command.find({client: user_Id}, function(error, command){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Commands not Found", data:error});
            }
            res.json({success: true, message: "Commands found", data:command})
        })
    },

    getUserPayments: function(req, res){
        var user_Id = req.body.user._id;
        Payment.find({client: user_Id}, function(error, payment){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Commands not Found", data:error});
            }
            res.json({success: true, message: "Commands found", data:payment})
        })
    }


};
