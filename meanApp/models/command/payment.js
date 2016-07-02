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
    facture:{
        type: String,
        required : false
    },
    client:{
        type: String,
        required : false
    },
    IBAN:{
        type: Number,
        required : false
    },
    status: {
        type: Boolean,
        required: false
    },
    paymentNumber:{
        type: Number,
        required: true
    }
});


var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = {
    Payment: Payment
};