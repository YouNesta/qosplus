/**
 * Created by Younes on 10/03/2016.
 */
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    _state:{
        type: Number,
        required : false
    },
    _role:{
        type: Number,
        required : false
    },
    _lastName:{
        type: String,
        index: true,
        required : true
    },
    _firstName:{
        type: String,
        required : true
    },
    _phone:{
        type: String,
        index: true,
        required : true
    },
    _mail:{
        type: String,
        index: true,
        required : true
    },
    _shop:{
        type: String,
        required : false

    },
    _director: {
        type: String,
        required : false
    },
    _associateShop: {
        type: Array,
        required : false
    },
    _averageLens: {
        type: Number,
        required : false
    },
    _providerLens: {
        type: String,
        required : false
    },
    _averageGlasses: {
        type: Number,
        required : false
    },
    _providerGlasses: {
        type: String,
        required : false
    },
    _commercial:{
        type: String,
        required : false,
        index: true
    },
    _financialShop:{
        type: String,
        required : false,
        index: true
    },
    _IBAN:{
        type: Number,
        required : false
    },
    _BIC:{
        type: Number,
        required : false

    },
    _financialMail:{
        type: String,
        index: true,
        required : false
    },
    _paymentState: {
        type: Boolean,
        required : false
    },
    _deliverShop: {
        type: String,
        required : false
    },
    _central:{
        type: String,
        required : false,
        index: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};