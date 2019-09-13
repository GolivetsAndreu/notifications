const request = require('supertest');
const app = require('../server.js');
const Notification = require('../models/notifications.js');

describe('Users registration', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users/create')
            .send({
                "user": {
                    "email": "test@gmail.com",
                    "password": "test"
                }
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('post');
    })
});