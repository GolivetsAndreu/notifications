const transporter = {
    host: AppConfig.mailHost,
    port: AppConfig.mailPort,
    secure: true,
    auth: {
        user: AppConfig.mailUser,
        pass: AppConfig.mailPass
    }
};

module.exports = transporter;