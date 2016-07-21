/**
 * Created by medrupaloscil on 19/03/2016.
 */

var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    type: {
        toric : Boolean,
        progressiv: Boolean
    },
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
        small: String,
        medium: String,
        big: String,
        original: String
    },
    supplier: {
        type: String,
        required: false
    },
    ametropia: {
        type: String,
        required: false
    },
    port: {
        type: String,
        required: false
    },
    portDuration: {
        type: Number,
        required: false
    }
});


var Product = mongoose.model('Product', ProductSchema);

module.exports = {
    Product: Product
};