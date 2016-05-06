/**
 * Created by medrupaloscil on 19/03/2016.
 */

var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required : true,
        index: true
    },
    material:{
        type: String,
        required : true 
    },
    color:{ 
        type: String, 
        required : true 
    },
    hydrophily:{ 
        type: Number, 
        required : true 
    },
    price:{ 
        type: Array, 
        required : false 
    },
    param: { 
        type: Array,
        required : false
    },
    item: { 
        type: Array,
        required : false
    },
    reference: { 
        type: String,
        required : true
    },
    image: {
        type: String,
        required : true
    },
    supplier: {
        type: String,
        required: false
    }
});


var Product = mongoose.model('Product', ProductSchema);

module.exports = {
    Product: Product
};