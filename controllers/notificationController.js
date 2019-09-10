const Notification = require('../models/notifications');

exports.new = function(req, res) {
  Notification.create(req.body, function (errors, notification) {
      notification ? res.status(200).end() : res.status(422).send(errors)
  });
};

exports.get = function(req, res) {
    Notification.find(req.body, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.findById = function(req, res) {
    Notification.find({ "_id": `${req.query.id}` }, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.updateById = function(req, res) {
    Notification.find({ "_id": `${req.body.id}` }).update(req.body.params, function(err, info) {
        if (err) throw err;
    });
    res.redirect(`/notification?id=${req.body.id}`);
};

exports.deleteById = function(req, res) {
    Notification.find({ "_id": `${req.body.id}` }).remove().exec();
    res.end('deleted');
};

