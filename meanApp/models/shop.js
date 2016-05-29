/**
 * Created by Younes on 12/03/2016.
 */
var mongoose = require("mongoose");

var ShopSchema = new mongoose.Schema({

    name: {
        type: String,
        index: true,
        required : true
    },
    socialReason: {
        type: String,
        index: true,
        required : false
    },
    adress: {
        type: String,
        index: true,
        required : true
    },
    adress2: {
        type: String,
        required : false
    },
    city: {
        type: String,
        index: true,
        required : true
    },
    zipCode: {
        type: Number,
        index: true,
        required : true
    },
    mobile: {
        type: String,
        index: true,
        required : true
    },
    phone: {
        type: String,
        index: true,
        required : false
    },
    fax: {
        type: String,
        index: true,
        required : false
    },
    mail: {
        type: String,
        index: true,
        required : true
    },
    tva: {
        type: Number,
        required : false
    },
    siret: {
        type: Number,
        index: true,
        required : false
    },
    adeli: {
        type: Number,
        index: true,
        required : false
    },
    nightBox:  {
        type: Boolean,
        required : false
    },
    transporteur: {
        type: String,
        required : false
    },
    openDay:  {
        type: String,
        required : false
    },
    closeDay:  {
        type: String,
        required : false
    },
    openHour:  {
        type: String,
        required : false
    },
    closeHour:  {
        type: String,
        required : false
    },
    owner:{
        type: String,
        required: false
    }
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = {
    Shop: Shop
};