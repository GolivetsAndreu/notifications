const nodeMailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config();

exports.sendMail = async (notification) => {
    const mailConfig = {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    };
    const transporter = nodeMailer.createTransport(mailConfig);

    transporter.sendMail(await mailOptions(notification), (err, info) => {
        err ? console.log(err) : console.log('Message %s sent: %s', info.messageId, info.response)
    });
};

async function mailOptions (notification) {
    let template = await ejs.renderFile(`./templates/${notification.template}.ejs`, JSON.parse(notification.body));

    return { to: notification.recipient, subject: notification.subject, html: JSON.stringify(template) };
}