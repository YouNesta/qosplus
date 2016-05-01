/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var mongoose = require("mongoose");

var CommandSchema = new mongoose.Schema({
    date:{
        type: Date,
        required : false
    },
    facture:{
        type: String,
        required : false
    },
    orderForm:{
        type: String,
        required : false
    },
    commandForm:{
        type: String,
        required : false
    },
    client:{
        type: String,
        required: false
    },
    product: {
        type: Array,
        required: true
    },
    shipping:{
        type: Number,
        required: false
    },
    carrier:{
        type: Number,
        required: false
    },
    status:{
        type: Number,
        required: true
    },
    payment:{
        type: Array,
        required: false
    }
});


var Command = mongoose.model('Command', CommandSchema);

module.exports = {
    Command: Command
};