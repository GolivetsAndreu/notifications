const request = require('supertest');
const app = require('../server.js');
require('./beforeAll/index.test.js');
require('./controllers/usersController.test.js')(request, app);
require('./controllers/notificationController.test.js')(request, app);