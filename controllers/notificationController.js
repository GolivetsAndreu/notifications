const Notification = require('../models/notifications');

exports.new = function(req, res) {
  Notification.create(req.body, function (err, notification) {
      notification ? res.status(200).end() : res.status(422).send(err)
  });
};

exports.get = function(req, res) {
    Notification.find(req.query, function(err, result) {
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
    Notification.updateOne({ "_id": `${req.body.id}` }, req.body.params, function(err, info) {
        if (err) throw err;
        res.redirect(`/notification?id=${req.body.id}`);
    });
};

exports.deleteById = function(req, res) {
    Notification.deleteOne({ "_id": `${req.body.id}` }, function (err, results) {
        if (err) throw err;
        res.end('deleted');
    });
};

