require('dotenv').config();

global.AppConfig = {
    "mailHost": process.env.MAIL_HOST,
    "mailPort": process.env.MAIL_PORT,
    "mailUser": process.env.MAIL_USER,
    "mailPass": process.env.MAIL_PASS,
    "port": process.env.PORT,
    "dbUrl": process.env.TEST_DB_URL,
    "secret": process.env.SECRET,
    "strategy": process.env.STRATEGY
};

global.User = {
    "user": {
        "email": "test@gmail.com",
        "password": "test"
    }
};
