require(`./config`);
require('./config/passport');
global.Logger = require('./services/logger');

const cookieParser = require('cookie-parser');
const i18n = require('./i18n');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(cookieParser());
app.use(i18n);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(AppConfig.port);

module.exports = app;
