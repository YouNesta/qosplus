
var mongoose = require('mongoose');

var MailSchema = new mongoose.Schema({

    data: {
        type: Object,
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