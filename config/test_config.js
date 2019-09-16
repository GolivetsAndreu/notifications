const indexConfig = require('./index');
indexConfig["dbUrl"] = process.env.TEST_DB_URL;

global.AppConfig = indexConfig;

global.User = {
    "user": {
        "email": "test@gmail.com",
        "password": "test"
    }
};
