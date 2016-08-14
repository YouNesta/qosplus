/**
 * Created by Medrupaloscil on 11/08/2016.
 */

var mongoose = require("mongoose");

var DiscountSchema = new mongoose.Schema({
    percent:{
        type: Number,
        required : true
    },
    facture:{
        type: String,
        required : false
    },
    amount:{
        type: Number,
        required : false
    },
});


var Discount = mongoose.model('Discount', DiscountSchema);

module.exports = {
    Discount: Discount
};