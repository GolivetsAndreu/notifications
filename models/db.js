const mongoose = require('mongoose');
const dbUrl = AppConfig.test ? AppConfig.testDbUrl : AppConfig.dbUrl
mongoose.connect(AppConfig.dbUrl, { useNewUrlParser: true });

module.exports = mongoose;
