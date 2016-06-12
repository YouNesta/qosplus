
var mongoose = require('mongoose');

var MailDataSchema = new mongoose.Schema({

    to: {
        type: String,
        required: true
    },
    object: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: false
    }
});

var MailData = mongoose.model('MailData', MailDataSchema);

module.exports = {
    MailData: MailData
};