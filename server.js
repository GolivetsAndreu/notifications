require('dotenv').config();
global.AppConfig = require('./config/index');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(AppConfig.port);
