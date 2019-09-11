const Notification = require('../models/notifications');
const ErrorService = require('../services/error');

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
        const notification = await Notification.find({ "_id": req.query.id });
        res.json(notification);
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.updateById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.find({ "_id": req.body.id });
        await Notification.updateOne({ "_id": req.body.id }, req.body.params, { runValidators: true });
        res.end();
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

exports.deleteById = async(req, res) => {
    try {
        ErrorService.checkRequest(req.body);
        await Notification.deleteOne({ "_id": req.body.id });
        res.end('deleted');
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

