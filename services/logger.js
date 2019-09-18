const path = require('path');
const winston = require('winston');
const errorsLog = path.join('logs', 'errors.log');
let transports = [ new winston.transports.Console()];
if (process.env.NODE_ENV !== 'test') { transports.push(new winston.transports.File({ filename: errorsLog })) }

module.exports = winston.createLogger({
    transports: transports,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
});
