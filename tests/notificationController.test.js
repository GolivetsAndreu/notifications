const request = require('supertest');
const app = require('../server.js');
const Notification = require('../models/notifications.js');

const notification = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "template": "test",
    "body": {
        "a": 1
    }
};

const user = {
    "user": {
        "email": "test@gmail.com",
        "password": "test"
    }
};

let token = '';

describe('Create notification', () => {
    it('drop', async () => {
        await Notification.deleteMany({});
    });

    it('Should login user', async () => {
        const res = await request(app).post('/users/login').send(user);

        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('email');
        token = res.body.user.token;
    });

    it('Should create notification', async() => {
        const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notification);

        console.log(res.body);
        expect(res.statusCode).toEqual(200);
    });
});