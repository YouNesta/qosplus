/**
 * Created by medrupaloscil on 19/03/2016.
 */

var Product = require("../models/product/product.js").Product;
var Item = require("../models/product/item.js").Item;
var logger = require('winston');

module.exports = {

    addProduct: function(req, res){
        var i = 0;
        setItem(req.body.products, i);

        function setItem(product,i){
            var regex = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
            if(i < product.item.length){
                var sphere = [];
                for (var n = product.item[i].sphere.min; n <= product.item[i].sphere.max; n += product.item[i].sphere.int) {
                    sphere.push({
                        sphere: n,
                        stock: product.item[i].stock
                    })
                }
                delete product.item[i].sphere;
                product.item[i].sphere = sphere;
                var item = new Item(product.item[i]);
                item.save(function(error, data) {
                    if (error) {
                        console.log(error);
                        logger.log('error', error);
                        res.json({success: false, message:error});
                    } else {
                        delete product.item[i];
                        product.item[i] = data.id;
                        i++;
                        setItem(product, i);
                    }
                });
            }else{
                setProduct(product);
            }
        }

        function setProduct(product){

            var productSchema = new Product(product);
             productSchema.save(function(error, data) {
                 if (error) {
                     console.log(error);
                     logger.log('error', error);
                     res.json({success: false, message:error});
                 } else {
                     res.json({success: true, message:"Product add success", data: data});
                 }
             })
        }
    },

    getProducts: function(products){
        console.log(products)
    }
};