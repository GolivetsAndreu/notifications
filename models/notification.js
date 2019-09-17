'use strict';
const fs = require('fs');
let templates = [];

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Subject is required"
            },
            notEmpty: {
                msg: "Subject is required"
            },
        }
    },
    body: {
        type: {},
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Body is required"
            },
            notNull: {
                msg: "Body is required"
            },
            isObject: (value) => {
                if (typeof value !== 'object') throw 'Body is not a valid json data!';
            }
        }
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Recipient is required"
            },
            notNull: {
                msg: "Recipient is required"
            },
            isEmail: {
                msg: "Your email is not valid email address"
            }
        }
    },
    template: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Template is required"
            },
            notNull: {
                msg: "Template is required"
            },
            haveTemplate: (value) => {
                templates = fs.readdirSync('templates/').map(file => { return file.split('.')[0]; });
                if (!templates.includes(value)) throw `${value} is an unknown template`;
            }
        }
    },
    isSend: DataTypes.BOOLEAN
  }, {
    hooks: {
      afterValidate: function(notification, options, fn) {
          notification.body = JSON.stringify(notification.body);
      }
    }
  });
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};
