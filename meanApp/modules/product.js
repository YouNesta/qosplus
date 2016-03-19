/**
 * Created by medrupaloscil on 19/03/2016.
 */

var Product = require("../models/product.js").User;
var logger = require('winston');

module.exports = {

    setProduct: function(req, res){
        var product = new Product(req.body.product);
        product.state = 0;
        product.save(function(error) {
            if (error) {
                console.log(error);
                logger.log('error', error);
            }
            if (product) {
                /*if (req.body.option.director) {
                    //Is director
                    Product.findOneAndUpdate({_id: product._id}, {$set: {director: user._id}}, function (error, data) {
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message: "Subscribe Failed", data: error});

                        }
                        setShop(user, shops);
                    })
                }*/
            }

        })

    },

    getProducts: function(products){
        console.log(products)
    }
};
