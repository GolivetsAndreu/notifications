const express = require('express');
const bodyParser = require('body-parser');
const Notification = require('models/notifications');
const routes = require('./routes/index');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.post('/notification', function(request, response){
    Notification.create(request.query, function (errors, notification) {
        if (notification) {
            response.status(200).end();
        } else {
            response.status(422).send(errors);
        }
    });

    // Notification.find({}, function(err, result) {
    //     if (err) throw err;
    //     if (result) {
    //         response.json(result);
    //     }
    // });
});

app.listen(3000);
