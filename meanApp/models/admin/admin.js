/**
 * Created by Younes on 10/03/2016.
 */
var mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
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
    _password:{
        type: String,
        required : true
    },
    _hash:{
        type: String,
        required : true
    }
});

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {
    Admin: Admin
};