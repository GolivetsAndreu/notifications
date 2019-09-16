const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return (/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i).test(v);
            },
            message: props => `${props.value} is not a email!`
        },
        required: [true, 'Email is required']
    },
    hash: String,
    salt: String,
});

/** crypto and set user's password
 * @param {string} password
 */
UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

/** validate password
 * @param {string} password
 * @returns {boolean} result
 */
UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

/** generate jwt token for user
 * @returns {string} token
 */
UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, AppConfig.secret);
};

/** convert user to json object
 * @returns {object} user info
 */
UsersSchema.methods.toAuthJSON = function() {
    return { _id: this._id, email: this.email, token: this.generateJWT() };
};

UsersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UsersSchema);
