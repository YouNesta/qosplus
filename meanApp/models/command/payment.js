/**
 * Created by Medrupaloscil on 25/04/2016.
 */

var mongoose = require("mongoose");

var PaymentSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required : true
    },
    date:{
        type: Date,
        required : false
    },
    client:{
        type: String,
        required : false
    },
    IBAN:{
        type: Number,
        required : true
    },
    status: {
        type: Boolean,
        required: false
    }
});


var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = {
    Payment: Payment
};