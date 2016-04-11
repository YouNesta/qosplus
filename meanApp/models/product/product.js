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
    price:{ 
        type: Number, 
        required : true 
    },
    product: { 
        type: Array,
        required : false
    }
});


var Product = mongoose.model('Product', ProductSchema);

module.exports = {
    Product: Product
};