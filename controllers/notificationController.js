const ErrorService = require('../services/error');
const sesClient = require('../services/ses-client');
const Notification = require('../models').Notification;

/** create notification
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns success status if success, {object} error if failed
 */
exports.new = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        const notification = await Notification.create(req.body);
        await sesClient.sendEmail(notification);
        await markNotification(notification);
        res.status(200).end();
    } catch(err) {
        Logger.log({ level: 'error', message: err });
        res.status(422).send(ErrorService.setError(err, res));
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
        const pageSize = 10;
        const page = req.query.page || 1;
        const offset = (page - 1)  * pageSize;
        const notifications = await Notification.findAll({ limit: pageSize, offset, where: {}, order: [['id', 'ASC']] });
        res.json(notifications);
    } catch(err) {
        Logger.log({ level: 'error', message: err });
        res.status(403).send(ErrorService.setError(err, res));
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
        const notification = await Notification.findOne({ where: { id: req.query.id } });
        res.json(notification);
    } catch (err) {
        Logger.log({ level: 'error', message: err });
        res.status(422).send(ErrorService.setError(err, res));
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
        await Notification.update(req.body.params, { where: { id: req.body.id } });
        res.end();
    } catch (err) {
        Logger.log({ level: 'error', message: err });
        res.status(422).send(ErrorService.setError(err, res));
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
        await Notification.destroy({ where: { id: req.body.id } });
        res.end('deleted');
    } catch (err) {
        Logger.log({ level: 'error', message: err });
        res.status(422).send(ErrorService.setError(err, res));
    }
};

/** mark notification that it sended after success sending email
 * @param {object} notification - MongoDB object
 */
const markNotification = (notification) => Notification.update({ isSend: true }, { where: { id: notification.id } });
