const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const mailConfig = require('../config/mail');

exports.sendMail = async (notification) => {
    const transporter = nodeMailer.createTransport(mailConfig);

    transporter.sendMail(await mailOptions(notification), (err, info) => {
        err ? console.log(err) : console.log('Message %s sent: %s', info.messageId, info.response)
    });
};

async function mailOptions (notification) {
    let template = await ejs.renderFile(`./templates/${notification.template}.ejs`, JSON.parse(notification.body));

    return { to: notification.recipient, subject: notification.subject, html: JSON.stringify(template) };
}