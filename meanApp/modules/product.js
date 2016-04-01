/**
 * Created by medrupaloscil on 19/03/2016.
 */

var Product = require("../models/product/product.js").Product;
var logger = require('winston');

module.exports = {

    setProduct: function(req, res){
        var product = new Product(req.body.product);
        product.save(function(error) {
            if (error) {
                console.log(error);
                logger.log('error', error);
            } else {
                console.log('Product added with success');
            }
        })
    },

    getProducts: function(products){
        console.log(products)
    }
};