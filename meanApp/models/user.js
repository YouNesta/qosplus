/**
 * Created by Younes on 10/03/2016.
 */
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    state:{
        type: Number,
        required : true
    },
    role:{
        type: Number,
        required : true
    },
    lastName:{
        type: String,
        index: true,
        required : true
    },
    firstName:{
        type: String,
        required : true
    },
    phone:{
        type: String,
        index: true,
        required : true
    },
    mail:{
        type: String,
        index: true,
        required : true
    },
    director: {
        type: String,
        required : false
    },
    associateShop: {
        type: Array,
        required : false
    },
    averageLens: {
        type: Number,
        required : false
    },
    providerLens: {
        type: String,
        required : false
    },
    averageGlasses: {
        type: Number,
        required : false
    },
    providerGlasses: {
        type: String,
        required : false
    },
    commercial:{
        type: String,
        required : false,
        index: true
    },
    IBAN:{
        type: Number,
        required : false
    },
    BIC:{
        type: Number,
        required : false

    },
    financialMail:{
        type: String,
        index: true,
        required : false
    },
    paymentState: {
        type: Boolean,
        required : false
    },
    central:{
        type: String,
        required : false,
        index: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};