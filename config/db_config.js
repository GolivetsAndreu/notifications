require('./index');

module.exports = {
    "development": {
        "username": AppConfig.dbUserName,
        "password": AppConfig.dbUserPass,
        "database": AppConfig.dbName,
        "host": AppConfig.dbHost,
        "dialect": "postgres"
    },
    "test": {
        "username": AppConfig.dbUserName,
        "password": AppConfig.dbUserPass,
        "database": "onixnotifications_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": AppConfig.dbUserName,
        "password": AppConfig.dbUserPass,
        "database": AppConfig.dbName,
        "host": AppConfig.dbHost,
        "dialect": "postgres"
    }
};
