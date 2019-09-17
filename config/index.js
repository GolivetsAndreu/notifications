require('dotenv').config();
const configs = require(`./${process.env.NODE_ENV || 'development'}_config.js`);

global.AppConfig = configs;

if (process.env.NODE_ENV === 'test') {
    global.User = {
        "user": {
            "email": "test@gmail.com",
            "password": "test"
        }
    };
}
