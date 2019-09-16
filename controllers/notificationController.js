const Notification = require('../models/notifications');
const ErrorService = require('../services/error');
const EmailService = require('../services/emails');

/** create notification
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns success status if success, {object} error if failed
 */
exports.new = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        const notification = await Notification.create(req.body);
        await EmailService.sendMail(notification);
        await markNotification(notification);
        res.status(200).end();
    } catch(err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** get all notification
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {array} of {object} notifications if success,
 * {object} error if failed
 */
exports.get = async(req, res) => {
    try {
        const notifications = await Notification.find({});
        res.json(notifications);
    } catch(err) {
        res.status(403).send(ErrorService.setError(err));
    }
};

/** find notification by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} notification if success, {object} error if failed
 */
exports.findById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.query);
        const notification = await Notification.find({ _id: req.query.id });
        res.json(notification);
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** update notification by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns success status if success, {object} error if failed
 */
exports.updateById = async(req, res) => {
    try {
        ErrorService.checkRequestOnId(req.body);
        ErrorService.checkRequest(req.body.params);
        await Notification.updateOne({ _id: req.body.id }, req.body.params, { runValidators: true });
        res.end();
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** delete notification by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns success status and {string} info - 'deleted' if success, {object} error if failed
 */
exports.deleteById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.deleteOne({ _id: req.body.id });
        res.end('deleted');
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** mark notification that it sended after success sending email
 * @param {object} notification - MongoDB object
 */
const markNotification = (notification) => Notification.updateOne({ _id: notification._id }, { isSend: true });
