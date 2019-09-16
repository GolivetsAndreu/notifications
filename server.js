require(`./config/${process.env.NODE_ENV === 'test' ? 'test_config' : 'dev_config'}`);
require('./config/passport');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(AppConfig.port);

module.exports = app;
