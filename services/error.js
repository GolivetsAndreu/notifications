exports.setError = function(err) {
    let errors = {};
    if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(function(key) {
            errors = { "errors": { [key]: { "message": err.errors[key].message } } };
        });
    } else if(err.name === 'CastError') {
        if (err.path === '_id') {
            errors = { "errors": { "id": { "message": "Wrong id!" } } };
        }
    } else {
        errors = { "errors": { "request": { "message": err.message || err } } };
    }
    return errors;
};

exports.checkRequest = function(args, userCheck = false) {
    if (userCheck && Object.keys(args).length < 2) {
        throw "Email or password can't be blank";
    } else if (Object.keys(args).length === 0) {
        throw "Request params can't be blank";
    }
};
