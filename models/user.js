'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./index').User;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                msg: "Your email is not valid email address"
            },
            isUnique: async (value) => {
                const result = await User.findOne({ where: { email: value } });
                if (result) throw `Error, expected email to be unique. Value: ${value}`;
            }
        },
        unique: true
    },
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.setPassword = function(password) {
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 100, 'sha512').toString('hex');
  };

  User.prototype.validatePassword = function(password) {
      const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 100, 'sha512').toString('hex');
      return this.hash === hash;
  };

  User.prototype.generateJWT = function() {
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 60);

      return jwt.sign({
          email: this.email,
          id: this._id,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
      }, AppConfig.secret);
  };

  User.prototype.toAuthJSON = function() {
      return { id: this.id, email: this.email, token: this.generateJWT() };
  };

  return User;
};