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
                msg: "errors.subject"
            },
            notEmpty: {
                msg: "errors.subject"
            },
        }
    },
    body: {
        type: {},
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.body"
            },
            notNull: {
                msg: "errors.body"
            },
            isObject: (value) => {
                if (typeof value !== 'object') throw "errors.wrongBody";
            }
        }
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.recipient"
            },
            notNull: {
                msg: "errors.recipient"
            },
            isEmail: {
                msg: "errors.wrongRecipient"
            }
        }
    },
    template: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.template"
            },
            notNull: {
                msg: "errors.template"
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
