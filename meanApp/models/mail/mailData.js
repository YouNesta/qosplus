
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
    template: {
        type: String,
        required: false
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