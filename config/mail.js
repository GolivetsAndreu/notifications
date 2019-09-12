const transporter = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'jdleonardi.test@gmail.com',
        pass: 'testgmail1!'
    }
};

module.exports = transporter;