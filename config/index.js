require('dotenv').config();
const configs = require(`./${process.env.NODE_ENV || 'development'}_config.js`);

global.AppConfig = configs;

