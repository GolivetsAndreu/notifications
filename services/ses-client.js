const AWS = require('aws-sdk');
const config = require('../config/aws_config');
const ejs = require('ejs');

AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.ses.region
});

const ses = new AWS.SES({apiVersion: '2010-12-01'});

/** sending notifications
 * @param {object} notification - MongoDB object
 * @param {string} from
 */
const sendEmail = async (notification, from) => {
    const params = {
        Destination: {
            ToAddresses: [notification.recipient]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: await setMessage(notification)
                },
                /* replace Html attribute with the following if you want to send plain text emails.
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
             */
            },
            Subject: {
                Charset: 'UTF-8',
                Data: notification.subject
            }
        },
        ReturnPath: from ? from : config.aws.ses.from.default,
        Source: from ? from : config.aws.ses.from.default,
    };

    ses.sendEmail(params, (err, data) => {
        return err ? Logger.log({ level: 'error', message: err }) : console.log("Email sent.", data)
    });
};

const setMessage = async (notification) => {
    const template = await ejs.renderFile(`./templates/${notification.template}.ejs`, JSON.parse(notification.body));
    return JSON.stringify(template);
};

module.exports = {sendEmail};
