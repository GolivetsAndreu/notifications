require(`./config/${process.env.NODE_ENV === 'test' ? 'test_config' : 'index'}`);
require('./config/passport');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(AppConfig.port);

function stop() {
    app.close();
}

module.exports = app;
module.exports.stop = stop;
