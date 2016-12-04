/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var mongoose = require("mongoose");

var CommandSchema = new mongoose.Schema({
    date:{
        type: Date,
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
    shop:{
        type: Object,
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
    IBAN:{
        type: Number,
        required : false
    },
    status:{
        type: Number,
        required: true
    },
    payment:{
        type: String,
        required: false
    },
    porter:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    commandNumber:{
        type: Number,
        required: true
    },
    discount:{
        type: String,
        required: false
    }
});


var Command = mongoose.model('Command', CommandSchema);

module.exports = {
    Command: Command
};