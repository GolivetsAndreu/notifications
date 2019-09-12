const mongoose = require('./db');
const fs = require('fs');
let templates = [];

const NotificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
    body: {
        type: String,
        validate: {
            validator: function(v) {
                return typeof v === 'object';
            },
            message: props => 'Body is not a valid json data!'
        },
        required: [true, 'Body is required']
    },
    recipient: {
        type: String,
        validate: {
            validator: function(v) {
                return (/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i).test(v);
            },
            message: props => `${props.value} is not a email!`
        },
        required: [true, 'Recipient is required']
    },
    template: {
        type: String,
        validate: {
            validator: function(v) {
                templates = fs.readdirSync('templates/').map(file => { return file.split('.')[0]; });
                return templates.includes(v);
            },
            message: props => `${props.value} is an unknown template`
        },
        required: [true, 'Template is required']
    },
    isSend: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

NotificationSchema.post('save', function() {
    this.body = JSON.stringify(this.body);
});

NotificationSchema.post('updateOne', function() {
    this._update.body = JSON.stringify(this._update.body);
});

module.exports = mongoose.model('notifications', NotificationSchema);
