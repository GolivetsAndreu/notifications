module.exports = {
    'aws': {
        'key': AppConfig.awsKey,
        'secret': AppConfig.awsSecret,
        'ses': {
            'from': {
                'default': AppConfig.awsFrom,
            },
            'region': AppConfig.awsRegion
        }
    }
};
