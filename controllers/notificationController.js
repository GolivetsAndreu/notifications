const Notification = require('../models/notifications');
const ErrorService = require('../services/error');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const MailConfig = require('../config/mail');

exports.new = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.create(req.body);
        res.status(200).end();
    } catch(err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.get = async(req, res) => {
    try {
        const notifications = await Notification.find({});
        res.json(notifications);
    } catch(err) {
        res.status(403).send(ErrorService.setError(err));
    }
};

exports.findById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.query);
        const notification = await Notification.find({ _id: req.query.id });
        res.json(notification);
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.updateById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.updateOne({ _id: req.body.id }, req.body.params, { runValidators: true });
        res.end();
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.deleteById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.deleteOne({ _id: req.body.id });
        res.end('deleted');
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.sendMails = async(req, res) => {
    try {
        let created_at = 0;
        let body = '';
        await Notification.find({ isSend: false }).then(function(notifications) {
            notifications.forEach(async(notification) => {
                let template = ejs.renderFile(`./templates/${notification.template}.ejs`, notification.body);
                await template.then(function (result) { body = JSON.stringify(result) });
                await sendMail(notification.recipient, notification.subject, body);
            });
            created_at = notifications[notifications.length - 1].createdAt;
        });

        if(created_at !== 0) { await markNotifications(created_at); }

        res.end();
    }  catch (err) {
        res.status(403).send(ErrorService.setError(err));
    }
};

async function markNotifications (created_at) {
    try {
        Notification.find({}).where('createdAt').lte(created_at).updateMany({}, { isSend: true });
    } catch (err) {
        throw err;
    }
}

async function sendMail(to, subject, body) {
    const transporter = nodeMailer.createTransport(MailConfig);
    const mailOptions = { to: to, subject: subject, html: body };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
