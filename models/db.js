var mongoose = require('mongoose');
mongoose.connect(AppConfig.dbUrl, { useNewUrlParser: true });

module.exports = mongoose;
