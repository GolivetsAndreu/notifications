const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT);
