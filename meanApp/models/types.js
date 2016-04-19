/**
 * Created by Younes on 19/04/2016.
 */
var mongoose = require("mongoose");

var TypeSchema = new mongoose.Schema({
    type:{
        type: Number,
        required : false
    },

    name:{
        type: String,
        required : false
    }
});

var Type = mongoose.model('Type', TypeSchema);

module.exports = {
    Type: Type
};