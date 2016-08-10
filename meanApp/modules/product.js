/**
 * Created by medrupaloscil on 19/03/2016.
 */

var Product = require("../models/product/product.js").Product;
var Type = require("../models/types.js").Type;
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
                    var spheres = [];
                    var r = 0;
                    for (var n = product.item[i].sphere.min; n <= product.item[i].sphere.max; n += product.item[i].sphere.int) {
                        var reference = c+1+'-'+i+'-'+r;


                        if(spheres.indexOf(n) == -1)
                            spheres.push(n);



                        sphere.push({
                            sphere: n,
                            stock: product.item[i].stock,
                            reference: reference
                        });
                        r++;
                    }
                    delete product.item[i].sphere;
                    product.item[i].sphere = sphere;
                    product.item[i].spheres = spheres;
                    product.param["sphere"] = spheres;
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
                res.json({success: false, message:error});
            }
            var i = 0;
            getItem(product, i);
        });

        function getItem(product, i){
            if(i < product.length){

                    Item.find({
                        '_id': { $in: product[i].item}
                    }, function(error, item){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message:error});
                        }
                        console.log(item);
                        delete product[i].item;
                        product[i].item = item;
                        i++;
                        getItem(product, i);
                    });

            }else{
                res.json({success: true, message:"Product List Find with success", data: product});
            }
        };

    },

    getActiveProducts: function(req, res){
        Product.find({status: 1}, function(err, product) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            var i = 0;
            getItem(product, i);
        });

        function getItem(product, i){
            if(i < product.length){

                    Item.find({
                        '_id': { $in: product[i].item}
                    }, function(error, item){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message:error});
                        }
                        console.log(item);
                        delete product[i].item;
                        product[i].item = item;
                        i++;
                        getItem(product, i);
                    });

            }else{
                res.json({success: true, message:"Active products List Find with success", data: product});
            }
        };

    },

    countPrice: function(req, res){
        Type.find({},function(err, count) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Product Price Count with success", data: count});
        });
    },

    listPrice: function(req, res){
        Product.find({}, 'name reference price', function(err, product) {
            if(err){
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:error});
            }
            res.json({success: true, message:"Product Price Find with success", data: product});
        });
    },

    updatePrice: function(req, res){
        Product.findOneAndUpdate({_id: req.body.product._id}, {price: req.body.product.price }, { 'new': true },  function(error, data){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Update Product Price  Failed", data:error});
            }
            res.json({success: true, message:"Update Product Price with success", data: data});
        });
    },

    createPrice: function(req, res){
        var type = new Type(req.body.price);
        type.save(function(error, type){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Update Product Price  Failed", data:error});
            }
            for(var i in req.body.price.products){
                for(var n in req.body.price.products[i].price){
                    if(req.body.price.products[i].price[n].type == type.type){
                        req.body.price.products[i].price[n]._id = type._id;
                        req.body.price.products[i].price[n].name = type.name;
                    }
                }
            }
            var i = 0;
            updatePrice(req.body.price.products, i)
        });


        function updatePrice(products, i){
           if(i < products.length){
               Product.findOneAndUpdate({_id: req.body.price.products[i]._id}, {price: req.body.price.products[i].price }, { 'new': true },  function(error, data){
                   if(error){
                       console.log(error);
                       logger.log('error', error);
                       res.json({ success: false, message: "Update Product Price  Failed", data:error});
                   }
                   i++;
                   updatePrice(req.body.price.products, i)
               });


           }else{
               res.json({success: true, message:"Update Product Price with success", data: products});
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

                Item.findOneAndUpdate({_id: product.item[i]._id}, {$set: product.item[i] }, { 'new': true },  function(error, item){
                    if(error){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Subscribe Failed", data:error});
                    }
                    product.item[i] = item._id;
                    console.log(item);
                    i++;
                    updateItem(product, i);
                });


            }else{
                updateProduct(product);
            }
        }
    },

    deleteProduct: function(req, res){
        var i = 0;

        deleteItem(req.body.product, i);
        function deleteProduct(product, i){
            Product.findOneAndRemove({_id: product._id}, function(err,product){
                if(err)
                {
                    console.log(err);
                    logger.log('error', err);
                    res.json({success: false, message:err});
                }
                else
                {
                    res.json({success: true, message:"Product Successfully deleted", data: product});
                }
            });
        }

        function deleteItem(product, i){
            if(i < product.item.length) {
                delete product.item[i].__v;
                Item.findOneAndRemove({_id: product.item[i]._id}, function(err,product){
                    if(err)
                    {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message:err});
                    }
                    else
                    {
                        res.json({success: true, message:"Product Successfully deleted", data: product});
                    }
                });
            }else{
                deleteProduct(product, i);
            }
        }



    },

    deleteProducts: function(req, res) {
        console.log('allProducts');
        console.log(req.body.products);

        req.body.products.forEach(function(product){
            var i = 0;
            Product.findOne({_id:product}, function(err, result){
                console.log(result);
                if(result.hasOwnProperty('item')){
                    deleteItem(result, i);
                }else{
                    deleteProduct(result, i);
                }
            });
        });

        function deleteProduct(product, index) {
                console.log('test4');
                Product.remove({_id: product._id}, function (err, product) {
                    if (err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message: err});
                    } else {
                        //res.json({success: true, message: "Product Successfully deleted", data: product});
                    }
                });
        }

        function deleteItem(product, i){
                if(i < product.item.length) {
                    console.log('testPreDel');
                    delete product.item[i].__v;
                    console.log('test3');
                    Item.findOne({_id: product.item[i]}, function(err,item){
                        if(err)
                        {
                            console.log(err);
                            logger.log('error', err);
                            res.json({success: false, message:err});
                        }else{
                            Item.remove({_id: item._id});
                        }
                        i++;
                        deleteItem(product, i);
                    });
                }else{
                    console.log('testtest');
                    deleteProduct(product, i);
                }
        }
    },

    getOneProduct: function(req, res){
        console.log(req.params.id);
        console.log('win');
        Product.findOne({_id: req.params.id}, function(err, product){
            if(err)
            {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            }
            console.log('win2');
            var i = 0;
            getItem(product, i);

            function getItem(product, i){
                if(i < product.length){

                    Item.find({
                        '_id': { $in: product[i].item}
                    }, function(error, item){
                        if (error) {
                            console.log(error);
                            logger.log('error', error);
                            res.json({success: false, message:error});
                        }
                        delete product[i].item;
                        product[i].item = item;
                        i++;
                        getItem(product, i);
                    });

                }else{
                    console.log('testtest');
                    res.json({success: true, message:"User List Find with success", data: product});
                }
            };
        })
    },

    getProductsById: function(req, res){
        Product.find({_id: {$in: req.body.productIds}}, function(err, products){
            if(err)
            {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            }
            res.json({success: true, message:"Products List Find with success", data: products});

        })
    },

    changeProductStatus: function(req, res) {
        var id = req.body.id;
        var status = req.body.status;
        Product.findOne({_id: id}, function(err, product){
            if(err) {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            } else {
                product.status = status;

                Product.findOneAndUpdate({_id: product._id}, product, { 'new': true }, function(err, product){
                    if(err) {
                        console.log(err);
                        logger.log('error', err);
                        res.json({success: false, message:err});
                    } else {
                        res.json({success: true, message:"Product updated", data: product});
                    }
                })
            }
        })
    },

    getProductsBySupplier: function(req, res){
        Product.find().sort({supplier: 1}, function(error, product){
            if(err)
            {
                console.log(err);
                logger.log('error', err);
                res.json({success: false, message:err});
            }
            console.log('win2');
            var i = 0;
            getItem(products, i);
        });

        function getItem(product, i){
            if(i < product.length){

                Item.find({
                    '_id': { $in: product[i].item}
                }, function(error, item){
                    if (error) {
                        console.log(error);
                        logger.log('error', error);
                        res.json({success: false, message:error});
                    }
                    console.log(item);
                    delete product[i].item;
                    product[i].item = item;
                    i++;
                    getItem(product, i);
                });

            }else{
                res.json({success: true, message:"Product List Find with success", data: product});
            }
        }
    },

    editItem: function(req, res){
        var item = req.body.item;

        Item.findOneAndUpdate({_id: item._id}, {$set: item }, { 'new': true },  function(error, item){
            if(error){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Subscribe Failed", data:error});
            }else{
                res.json({success: true, message: "succesfully updated", data: item});
            }
        });
    },

    duplicateProduct: function(req, res){
        var product = req.body.product;

        Product.find({_id: product._id}, function(err, result){
            if(err){
                console.log(error);
                logger.log('error', error);
                res.json({ success: false, message: "Product not found", data:error});
            }else{
                var newProduct = result;
                newProduct._id = mongoose.Types.ObjectId();
                newProduct.save(function(err, newResult){
                    if(err){
                        console.log(error);
                        logger.log('error', error);
                        res.json({ success: false, message: "Product not duplicated", data:error});
                    }else{
                        res.json({success: true, message: "product duplicated", data: newResult})
                    }
                })
            }
        })
    }
};
