const notification = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "template": "test",
    "body": {
        "a": 1
    }
};

const notWithoutSubject = {
    "recipient": "test@gmail.com",
    "template": "test",
    "body": {
        "a": 1
    }
};

const notWithoutRecipient = {
    "subject": "test",
    "template": "test",
    "body": {
        "a": 1
    }
};

const notWitWrongRecipient = {
    "subject": "test",
    "recipient": "test",
    "template": "test",
    "body": {
        "a": 1
    }
};

const notWithoutTemplate = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "body": {
        "a": 1
    }
};

const notWithWrongTemplate = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "template": "test10-2-0",
    "body": {
        "a": 1
    }
};

const notWithoutBody = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "template": "test",
};

const notWithWrongBody = {
    "subject": "test",
    "recipient": "test@gmail.com",
    "template": "test",
    "body": "test"
};

const paramsForUpdate = {
    "subject": "test-updated"
};

let token = '';
let newNotification = '';

module.exports = (request, app) => {
    describe('Create notification', () => {
        it('Should login user', async () => {
            const res = await request(app).post('/users/login').send(User);

            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('email');
            token = res.body.user.token;
        });

        it('Should create notification', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notification);

            expect(res.statusCode).toEqual(200);
        });

        it('Should send mail', async () => {
            const res = await request(app).get('/notification/all').set('Authorization', `Token ${token}`);

            newNotification = res.body[0];
            expect(res.body[0].isSend).toEqual(true);
        });

        it('Can`t create notification without params', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`);
            const error = { "errors": { "request": { "message": "Request params can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification without subject', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithoutSubject);
            const error = { "errors": { "subject": { "message": "Subject is required" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification without recipient', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithoutRecipient);
            const error = { "errors": { "recipient": { "message": "Recipient is required" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification with wrong recipient', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWitWrongRecipient);
            const error = { "errors": { "recipient": { "message": "test is not a email!" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification without template', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithoutTemplate);
            const error = { "errors": { "template": { "message": "Template is required" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification with wrong template', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithWrongTemplate);
            const error = { "errors": { "template": { "message": "test10-2-0 is an unknown template" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification without body', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithoutBody);
            const error = { "errors": { "body": { "message": "Body is required" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t create notification with wrong body', async () => {
            const res = await request(app).post('/notification/create').set('Authorization', `Token ${token}`).send(notWithWrongBody);
            const error = { "errors": { "body": { "message": "Body is not a valid json data!" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });
    });

    describe('Get notification', () => {
        it('Get notification by id', async () => {
            const res = await request(app).get('/notification/').set('Authorization', `Token ${token}`).query({ id: newNotification._id });

            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toStrictEqual(newNotification);
        });

        it('Can`t get notification without id', async () => {
            const res = await request(app).get('/notification/').set('Authorization', `Token ${token}`);
            const error = { "errors": { "request": { "message": "Request params can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t get notification with wrong id', async () => {
            const res = await request(app).get('/notification/').set('Authorization', `Token ${token}`).query({ id: 'asdfsdf' });
            const error = { "errors": { "id": { "message": "Wrong id!" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t get notification without token', async () => {
            const res = await request(app).get('/notification/').query({ id: newNotification._id });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('Get all notifications', () => {
        it('Get notifications', async () => {
            const res = await request(app).get('/notification/all').set('Authorization', `Token ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(1);
        });

        it('Can`t get notifications without token', async () => {
            const res = await request(app).get('/notification/all').query({ id: newNotification._id });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('Update notification by id', () => {
        it('update notification', async () => {
            const res = await request(app).put('/notification/update').set('Authorization', `Token ${token}`).send({ id: newNotification._id, params: paramsForUpdate });

            expect(res.statusCode).toEqual(200);
        });

        it('Check notification on update', async () => {
            const res = await request(app).get('/notification/').set('Authorization', `Token ${token}`).query({ id: newNotification._id });

            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('subject', 'test-updated');
        });

        it('Can`t update without id', async () => {
            const res = await request(app).put('/notification/update').set('Authorization', `Token ${token}`).send({ params: paramsForUpdate });
            const error = { "errors": { "request": { "message": "Id can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t update with wrong id', async () => {
            const res = await request(app).put('/notification/update').set('Authorization', `Token ${token}`).send({ id: 'asdfsdf', params: paramsForUpdate });
            const error = { "errors": { "id": { "message": "Wrong id!" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t update without params', async () => {
            const res = await request(app).put('/notification/update').set('Authorization', `Token ${token}`).send({ id: newNotification._id });
            const error = { "errors": { "request": { "message": "Request params can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t update without token', async () => {
            const res = await request(app).put('/notification/update').send({ id: newNotification._id, params: paramsForUpdate });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('Delete notification by id', () => {
        it('Can`t delete without id', async () => {
            const res = await request(app).delete('/notification/delete').set('Authorization', `Token ${token}`);
            const error = { "errors": { "request": { "message": "Request params can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t delete with wrong id', async () => {
            const res = await request(app).delete('/notification/delete').set('Authorization', `Token ${token}`).send({ id: 'sdsdf' });
            const error = { "errors": { "id": { "message": "Wrong id!" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t delete without token', async () => {
            const res = await request(app).delete('/notification/delete').send({ id: newNotification._id });

            expect(res.statusCode).toEqual(401);
        });

        it('Should delete notification', async () => {
            const res = await request(app).delete('/notification/delete').set('Authorization', `Token ${token}`).send({ id: newNotification._id });

            expect(res.statusCode).toEqual(200);
        });
    });
};