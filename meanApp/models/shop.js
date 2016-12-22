/**
 * Created by Younes on 12/03/2016.
 */
var mongoose = require("mongoose");

var ShopSchema = new mongoose.Schema({

    name: {
        type: String
    },
    socialReason: {
        type: String
    },
    adress: {
        type: String
    },
    adress2: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    mobile: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    mail: {
        type: String
    },
    tva: {
        type: String
    },
    siret: {
        type: String
    },
    adeli: {
        type: String
    },
    nightBox:  {
        type: Boolean
    },
    transporteur: {
        type: String
    },
    owner:{
        type: String
    },
    code:{
        type: Number
    },
    disponibility: [{
        day: String,
        data: {
            morning: {
                opening: Date,
                closing: Date
            },
            afternoon: {
                opening: Date,
                closing: Date
            }
        }
    }]
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = {
    Shop: Shop
};
