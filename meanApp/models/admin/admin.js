/**
 * Created by Younes on 10/03/2016.
 */
var mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
    role:{
        type: Number,
        required : false
    },
    lastName:{
        type: String,
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
    password:{
        type: String,
        required : true
    },
    hash:{
        type: String,
        required : true
    }
});

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {
    Admin: Admin
};