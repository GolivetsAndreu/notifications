exports.setError = function(err, type, key = null) {
    let errors = {};
    if (type === 'ValidationError') {
        Object.keys(err.errors).forEach(function(key) {
            errors = { "errors": { [key]: { "message": err.errors[key].message } } };
        });
    } else {
        errors = { "errors": { [key]: { "message": err } } };
    }
    return errors;
};