const indexConfig = require('./index');
indexConfig["dbUrl"] = process.env.DB_URL;

global.AppConfig = indexConfig;
