
var mongoose = require('mongoose');
var MailDataSchema = require('./mailData').MailDataSchema;

var MailSchema = new mongoose.Schema({

    type: {
      type: String,
        required: true
    },
    data: {
        type: MailDataSchema,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isSended: {
        type: Boolean,
        required: true,
        default: false
    },
    hasCrashed: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Mail = mongoose.model('Mail', MailSchema);

module.exports = {
    Mail: Mail
};