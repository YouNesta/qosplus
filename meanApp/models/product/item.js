/**
 * Created by Younes on 13/04/2016.
 */

var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    radius:{
        type: Number,
        required : false
    },
    diameter:{
        type: Number,
        required : false
    },
    axis:{
        type: Number,
        required : false
    },
    cylinder:{
        type: Number,
        required : false
    },
    addition:{
        type: String,
        required : false
    },
    spheres:{
        type: Array,
        required : true
    },
    sphere:{
        type: Array,
        required : true
    },
    condition: {
        type: Number,
        required : true
    }
});


var Item = mongoose.model('Item', ItemSchema);

module.exports = {
    Item: Item
};