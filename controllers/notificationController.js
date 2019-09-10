const Notification = require('../models/notifications');

exports.new = async(req, res) => {
    try {
        await Notification.create(req.body);
        res.status(200).end();
    } catch(err) {
        res.status(422).send(err);
    }
};

exports.get = async(req, res) => {
    try {
        const notifications = await Notification.find({});
        res.json(notifications);
    } catch(err) {
        res.status(403).send(err);
    }
};

exports.findById = async(req, res) => {
    try {
        const notification = await Notification.find({ "_id": `${req.query.id}` });
        res.json(notification);
    } catch (err) {
        res.status(422).send({ "errors": { "id": { "message": "Wrong id!" } } });
    }
};

exports.updateById = async(req, res) => {
    try {
        await Notification.find({ "_id": `${req.body.id}` });
        try {
            await Notification.updateOne({ "_id": `${req.body.id}` }, req.body.params, { runValidators: true });
            res.redirect(`/notification?id=${req.body.id}`)
        } catch (err) {
            res.status(422).send(err);
        }
    } catch (err) {
        res.status(422).send({ "errors": { "id": { "message": "Wrong id!" } } });
    }
};

exports.deleteById = async(req, res) => {
    try {
        await Notification.deleteOne({ "_id": `${req.body.id}` });
        res.end('deleted');
    } catch (err) {
        res.status(422).send({ "errors": { "id": { "message": "Wrong id!" } } });
    }
};

