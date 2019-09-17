require('dotenv').config();

global.AppConfig = {
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
    "dbName": process.env.DB_NAME,
    "dbHost": process.env.DB_HOST,
    "dbUserName": process.env.DB_USER_NAME,
    "dbUserPass": process.env.DB_USER_PASS,
};
