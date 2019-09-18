const path = require('path');
const winston = require('winston');
const errorsLog = path.join('logs', 'errors.log');

module.exports =  winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: errorsLog })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
});
