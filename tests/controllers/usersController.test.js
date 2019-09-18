const userWithWrongEmail = {
    "user": {
        "email": "test",
        "password": "test"
    }
};

const userWithWrongPass = {
    "user": {
        "email": "test@gmail.com",
        "password": "wrong password"
    }
};

let token = '';

module.exports = (request, app) => {
    describe('Users registration', () => {
        it('Can`t registration user without params', async () => {
            const res = await request(app).post('/users/create');
            const error = { "errors": { "request": { "message": "Email or password can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t registration with not an email', async () => {
            const res = await request(app).post('/users/create').send(userWithWrongEmail);
            const error = { "errors": { "email": { "message": "Your email is not valid email address" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Should registration a new user', async () => {
            const res = await request(app).post('/users/create').send(User);

            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user).toHaveProperty('token');
        });

        it('Can`t registration with the same email', async () => {
            const res = await request(app).post('/users/create').send(User);
            const error = { "errors": { "email": { "message": "Error, expected email to be unique. Value: test@gmail.com" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });
    });

    describe('User login', () => {
        it('Should login user', async () => {
            const res = await request(app).post('/users/login').send(User);

            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('email');
            token = res.body.user.token;
        });

        it('Can`t login user without params', async () => {
            const res = await request(app).post('/users/login');
            const error = { "errors": { "request": { "message": "Email or password can't be blank" } } };

            expect(res.statusCode).toEqual(422);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t login user with wrong email', async () => {
            const res = await request(app).post('/users/login').send(userWithWrongEmail);
            const error = { "errors": { "email or password": "is invalid" } };

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual(error);
        });

        it('Can`t login user with wrong password', async () => {
            const res = await request(app).post('/users/login').send(userWithWrongPass);
            const error = { "errors": { "email or password": "is invalid" } };

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual(error);
        });
    });

    describe('Get current user', () => {
        it('Should get current user', async () => {
            const res = await request(app).get('/users/current').set('Authorization', `Token ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user).toHaveProperty('token');
        });

        it('Can`t get current user with wrong token', async () => {
            const res = await request(app).get('/users/current').set('Authorization', `Token test.wrong.token`);

            expect(res.statusCode).toEqual(401);
        });

        it('Can`t get current user without token', async () => {
            const res = await request(app).get('/users/current');

            expect(res.statusCode).toEqual(401);
        });
    });
};
