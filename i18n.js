const i18n = require('i18n');

i18n.configure({
    locales:['en', 'ru'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'lang',
    objectNotation: true,
    updateFiles: false,
    autoReload: true
});

module.exports = function(req, res, next) {
    i18n.init(req, res);
    res.locals.__ = i18n.__;
    const current_locale = i18n.getLocale();
    return next();
};