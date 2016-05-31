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
    status:{
        type: Number,
        required: false
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
    ownerPrice:{ 
        type: Array, 
        required : false 
    },
    middlePrice:{ 
        type: Number, 
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
        type: Array,
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