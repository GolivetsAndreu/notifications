/** complete error
 * @param {object} err or {string} err
 * @returns {object} error
 */
exports.setError = function(err, res) {
    let errors = {};
    if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(function(key) {
            errors = { "errors": { [key]: { "message": err.errors[key].message } } };
        });
    } else if (err.name === 'SequelizeValidationError') {
        Object.keys(err.errors).forEach(function(key) {
            errors = { "errors": { [err.errors[key].path]: { "message": res.__(`${err.errors[key].message}`) } } };
        });
    } else if(err.name === 'SequelizeDatabaseError') {
        if (err.message.includes('invalid input syntax for integer:')) errors = { "errors": { "id": { "message": res.__("errors.wrongId") } } };
    } else errors = { "errors": { "request": { "message": res.__(`${err.message || err}`) } } };
    return errors;
};

/** check request for including params
 * @param {object} args - Express request body or query object
 * @param {boolean} userCheck
 */
exports.checkRequest = function(args, userCheck = false) {
    if(args === undefined) args = {};
    if (userCheck && !Object.keys(args).includes('password') && !Object.keys(args).includes('email')) {
        throw "errors.emailAndPasswordCantBeBlank";
    } else if (Object.keys(args).length === 0) {
        throw "errors.requestCantBeBlank";
    }
};

exports.checkRequestOnId = function (args) {
    if(!Object.keys(args).includes('id')) {
        throw "errors.idCantBeBlank";
    }
};
