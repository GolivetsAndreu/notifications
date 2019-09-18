module.exports = {
    "mailHost": process.env.MAIL_HOST,
    "mailPort": process.env.MAIL_PORT,
    "mailUser": process.env.MAIL_USER,
    "mailPass": process.env.MAIL_PASS,
    "port": process.env.PORT,
    "secret": process.env.SECRET,
    "strategy": process.env.STRATEGY,
    "awsKey": process.env.AWS_KEY,
    "awsSecret": process.env.AWS_SECRET,
    "awsFrom": process.env.AWS_FROM_DEFAULT,
    "awsRegion": process.env.AWS_REGION,
    "db": {
        "database": "onixnotifications_test",
        "host": "127.0.0.1",
        "username": process.env.DB_USER_NAME,
        "password": process.env.DB_USER_PASS,
        "dialect": "postgres"
    }
};

global.User = {
    "user": {
        "email": "test@gmail.com",
        "password": "test"
    }
};
