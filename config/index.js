require('dotenv').config();

const indexConfig = {
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
};

module.exports = indexConfig;
