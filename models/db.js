var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notifications', { useNewUrlParser: true });
module.exports = mongoose;
