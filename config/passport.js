const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models').User;
const jwt = require('express-jwt');

/** check params for login user
 *  return {object} error if failed, {object} user if success
 */
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, async(email, password, done) => {
    const user = await User.findOne({ where: { email: email } });
    if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
    } else {
        return done(null, user);
    }
}));

/** get authentication token
 * @param {object} req - Express request object
 * @returns {string} token if headers include him, null if don't
 */
const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;
    return authorization && authorization.split(' ')[0] === 'Token' ? authorization.split(' ')[1] : null
};

/** complete jwt options for requests
 * @param {boolean} required
 * @returns {object} jwt options
 */
const jwtOptions = (required = true) => {
    return jwt({
        secret: AppConfig.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: required,
    });
};

const auth = {
    required: jwtOptions(),
    optional: jwtOptions(false),
};

module.exports = auth;