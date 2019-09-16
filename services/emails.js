const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const mailConfig = require('../config/mail');

/** send mail to recipient
 * @param {object} notification - MongoDB object
 */
exports.sendMail = async (notification) => {
    const transporter = nodeMailer.createTransport(mailConfig);

    transporter.sendMail(await mailOptions(notification), (err, info) => {
        err ? console.log(err) : console.log('Message %s sent: %s', info.messageId, info.response)
    });
};

/** complete options for mail
 * @param {object} notification - MongoDB object
 * @returns {object} options
 */
async function mailOptions (notification) {
    let template = await ejs.renderFile(`./templates/${notification.template}.ejs`, JSON.parse(notification.body));

    return { to: notification.recipient, subject: notification.subject, html: JSON.stringify(template) };
}