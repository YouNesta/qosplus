/**
 * Created by Younes on 12/03/2016.
 */
var mongoose = require("mongoose");

var ShopSchema = new mongoose.Schema({

    _name: {
        type: String,
        index: true,
        required : true
    },
        _socialReason: {
        type: String,
        index: true,
        required : false
    },
        _adress: {
        type: String,
        index: true,
        required : true
    },
        _adress2: {
        type: String,
        required : false
    },
        _city: {
        type: String,
        index: true,
        required : true
    },
        _zipCode: {
        type: Number,
            index: true,

            required : true

    },
        _mobile: {
        type: String,
            index: true,

            required : true

    },
        _phone: {
        type: String,
            index: true,

            required : false

    },
        _fax: {
        type: String,
            index: true,

            required : false

    },
        _mail: {
        type: String,
        index: true,
        required : true
    },
        _tva: {
        type: Number,

        required : false

    },
        _siret: {
        type: Number,
            index: true,

            required : false

    },
        _adeli: {
        type: Number,
            index: true,
            required : false

    },
        _nightBox:  {
            type: Boolean,
            required : false
        },
        _transporteur: {
        type: String,
        index: true,
        required : false
    },

    _openDay:  {
        type: String,
        required : false
    },
    _closeDay:  {
        type: String,
        required : false
    },
        _openHour:  {
            type: Date,
            required : false
        },
        _closeHour:  {
            type: Date,
            required : false
        }
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = {
    Shop: Shop
};