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
            Product.count({}, function(err, c) {
                if(i < product.item.length){
                    var sphere = [];
                    var r = 0;
                    for (var n = product.item[i].sphere.min; n <= product.item[i].sphere.max; n += product.item[i].sphere.int) {
                        var reference = c+1+'-'+i+'-'+r;
                        sphere.push({
                            sphere: n,
                            stock: product.item[i].stock,
                            reference: reference
                        });
                        r++;
                    }
                    delete product.item[i].sphere;
                    product.item[i].sphere = sphere;
                    var item = new Item(product.item[i]);
                    item.save(function(error, data) {
                        if (error) {
                            console.log('estt');
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
                    setProduct(product, c);
                }
            });
        }

        function setProduct(product, c ){
            product.reference = c+1;
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

    getProducts: function(req, res){
        Product.find({}, function(err, product) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:error});
            }
            var i = 0;
            getItem(product, i);
        });

        function getItem(product, i){
            console.log( product.length, i )
            if(i < product.length){

                    Item.find({
                        '_id': { $in: product[i].item}
                    }, function(error, item){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message:error});
                        }
                        console.log(product[i].item);
                        delete product[i].item;
                        console.log(product[i].item);
                        product[i].item = item;
                        i++;
                        getItem(product, i);
                    });

            }else{
                res.json({success: true, message:"User List Find with success", data: product});
            }
        }
    },

    editProduct: function(req, res){
        var i = 0;

        updateItem(req.body.product, i);
        function updateProduct(product, i){
            Product.findOneAndUpdate({_id: product._id}, {
                $set: {
                    'name': product.name,
                    'hydrophily': product.hydrophily,
                    'material': product.material,
                    'color': product.color,
                    'price': product.price,
                    'reference': product.reference,
                    'item': product.item,
                    'param': product.param
                }
            }, function(err, product){
                if(err)
                {
                    console.log(err);
                    logger.log('error', err);
                    res.json({success: false, message:err});
                }
                else
                {
                    res.json({success: true, message:"Product Successfully updated", data: product});
                }
            })
        }

        function updateItem(product, i){
            if(i < product.item.length) {
                delete product.item[i].__v;

                Item.findOneAndUpdate({_id: product.item[i]._id}, {$set: product.item[i] }, { 'new': true },  function(error, shop){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    product.item[i] = shop._id;
                    console.log(shop);
                    i++;
                    updateItem(product, i);
                });


            }else{
                updateProduct(product);
            }
        }
    },

    deleteProduct: function(req, res){
        Product.findOneAndRemove({_id: req.body.product._id}, function(err,product){
            if(err)
            {
                console.log(err);
                logger.log('error', err);
                res.res.json({success: false, message:err});
            }
            else
            {
                res.json({success: true, message:"Product Successfully deleted", data: product});
            }
        });

    }

};