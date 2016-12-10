/**
 * Created by Younes on 13/03/2016.
 */
var crypto    = require('crypto');
var SHA256 = require("crypto-js/sha256");
var User = require("../models/user.js").User;
var Command = require("../models/command/command.js").Command;
var Payment = require("../models/command/payment.js").Payment;
var Shop = require("../models/shop.js").Shop;
var logger = require('winston');
var generatePassword = require('password-generator');


module.exports = {

    generateClearPassword: function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        var password = this.generatePassword(text);

        var data = {
            clear: text,
            password: password.password,
            hash: password.hash
        };

        return data;
    },

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

        var zipCode = req.body.shops[0].zipCode.toString();
        var department = zipCode.substring(0,2);

        switch(department) {
            case "75": case "69": case "13":
                var district =   zipCode.substring(3,5);
                break;
            default:
                var district = "00";
                break
        }
        
        Shop.count({zipCode: zipCode}, function(err, c) {
            var numb = c+26;
            var clientCode = department+district+numb;
            req.body.user.code = clientCode;
            req.body.shops[0].code = clientCode;

            saveUser(req.body, function(err, doesExists){
                var user = new User(req.body.user);
                if(!doesExists){
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
                }else{
                    res.json({success: false, message: "User already Exist"});
                }
            });

        });






        function saveUser(body, callback){
            User.findOne({mail: body.user.mail}, function(error, user){
                if(error){
                    console.log(error);
                    logger.log('error', error);
                    callback(error, false);
                }
                if(user){
                    callback(null, true);
                }else{
                    callback("",false);
                }
            })
        }

        function setShop(user, shops){
            if(shops.length >= 1){
                shops[0].owner = user._id;
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
                        }else{
                            res.json({success: true, message: 'User Updated!', user: user});
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
                    i++;
                    updateShop(user, i);
                });


            }else{
                updateUser(user);
            }
        }
    },

    getUserShops: function(req, res) {
        var user = req.body.user;
        var shops = [];
        var i = 0;
        User.findOne({_id: user._id}, function(error, user){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "User Not Found", data:error});
            }
            findShop(user, i);
        });

        function findShop(user, i){
            if(i < user.associateShop.length) {

                delete user.associateShop[i].__v;

                Shop.find({_id: user.associateShop[i]}, function(error, shop){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    shops.push(shop);
                    i++;
                    findShop(user, i);
                });


            }else{
                sendRes();
            }
        }

        function sendRes() {
            res.json({ success: true, message: "Shops Found", data:shops});
        }
    },

    getProfile: function(req, res){
        var i = 0;
        var user = req.body.user;
        findShop(user, i);
        function findUser(user){
            User.findOne({_id: user._id}, function(error, user){
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
                    i++;
                    findShop(user, i);
                });


            }else{
                findUser(user);
            }
        }

    },

    getUserCommands: function(req, res){
        var user_mail = req.body.user.mail;
        Command.find({client: user_mail}, function(error, command){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Commands not Found", data:error});
            }
            res.json({success: true, message: "Commands found", data:command})
        })
    },

    getByMail: function(req, res){
        var user_mail = req.body.mail;
        User.findOne({mail: user_mail}, function(error, user){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "User not Found", data:error});
            }
            res.json({success: true, message: "User found", data: user})
        })
    },

    getById: function(req, res){
        var id = req.body.id;
        User.findOne({_id: id}, function(error, user){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "User not Found", data:error});
            }
            res.json({success: true, message: "User found", data: user})
        })
    },

    getUserPayments: function(req, res){
        var user_mail = req.body.user.mail;
        Payment.find({client: user_mail}, function(error, payment){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Payments not Found", data: error});
            }
            res.json({success: true, message: "Payments found", data: payment})
        })
    },

    getUsers: function(req, res) {
        User.find({state: 1}, function(err, users) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            }else{
                if(users){
                    var i = 0;
                    getUsers(users, i);
                }
            }



        });

        function getUsers(users, i){
            if(i < users.length){
                var user = users[i];

                if(user.director != user._id){
                    User.findOne({_id: user.director}, function(err, director) {
                        if(err){
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        }else{
                            if(director){
                                users[i].director = JSON.stringify(director);
                                Shop.find({
                                    '_id': { $in: user.associateShop}
                                }, function(err, shops){
                                    users[i].associateShop = shops;
                                    i++;
                                    getUsers(users, i);
                                });
                            }
                        }


                    });
                }else{
                    Shop.find({
                        '_id': { $in: user.associateShop}
                    }, function(err, shops){
                        if(err){
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        }else{
                            if(shops){
                                users[i].associateShop = shops;
                                i++;
                                getUsers(users, i);
                            }
                        }

                    });
                }

            }else{
                res.json({success: true, message:"User List Find with success", data: users});
            }
        }
    }

};
