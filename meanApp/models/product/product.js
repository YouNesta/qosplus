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
        type: Number,
        required : true 
    },
    color:{ 
        type: Number, 
        required : true 
    },
    hydrophily:{ 
        type: Number, 
        required : true 
    },
    diameter: {
        type: Number,
        required : true 
    },
    radius: { 
        type: Number, 
        required : true
    }, 
    sphere: {
        type: Array,
        required : false 
    },
    addition: { 
        type: Array,
        required : false 
    },
    axis: { 
        type: Array,
        required : false 
    },
    cylinder: {
        type: Array, 
        required : false
    },
    stock: { 
        type: Array,
        required : false
    }
});


var Product = mongoose.model('Product', ProductSchema);

module.exports = {
    Product: Product
};