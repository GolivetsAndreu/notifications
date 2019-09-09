var mongoose = require('./db');

var NotificationSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: [true, 'Subject is required']
    },
    body: {
      type: {},
      validate: {
        validator: function(v) {
          return typeof v === 'object' ? true : false
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
      required: [true, 'Template is required']
    },
}, {timestamps: true});

module.exports = mongoose.model('notifications', NotificationSchema);