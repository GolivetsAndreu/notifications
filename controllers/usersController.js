const passport = require('passport');
const Users = require('../models/users');
const ErrorService = require('../services/error');

/** registration user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} user including his {string} token if success
 * {object} error if failed
 */
exports.registration = async (req, res) => {
    try {
        const { body: { user } } = req;
        ErrorService.checkRequest(user, true);

        const newUser = await new Users(user);
        await newUser.setPassword(user.password);
        await newUser.save();

        res.json({ user: await newUser.toAuthJSON() });
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** login user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} user including his {string} token if success
 * {object} error if failed
 */
exports.login = async(req, res) => {
    try {
        const { body: { user } } = req;
        ErrorService.checkRequest(user, true);
        await passport.authenticate(AppConfig.strategy, { session: false },
            (err, passportUser, info) => sendPassportUser(err, passportUser, info, res)
        )(req, res);
    } catch (err) {
        res.status(422).send(ErrorService.setError(err));
    }
};

/** get current user
 * headers must include Authentication token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} user including his {string} token if success
 * {object} error if failed
 */
exports.getCurrent = async(req, res) => {
    const { payload: { id } } = req;
    const user = await Users.findById(id);

    return user ? res.json({ user: user.toAuthJSON() }) : res.sendStatus(400)
};

/** send user after success login
 * @param {object} err - Passport error object
 * @param {object} passportUser - Passport user object
 * @param {object} info - Passport info object
 * @param {object} res - Express response object
 */
function sendPassportUser(err, passportUser, info, res) {
    if (err) { throw err; }
    else if (passportUser) {
        passportUser.token = passportUser.generateJWT();
        res.json({ user: passportUser.toAuthJSON() });
    } else if (info) {
        res.status(400).send(info);
    }
}
