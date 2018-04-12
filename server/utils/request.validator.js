const util = require('util');
const Validator = {};

/**
 * Validate req body against schema
 */
Validator.body = function (schema){
    return function (req, res, next) {
        req.checkBody(schema);
        req.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                return res.status(400).json('Invalid body: ' + util.inspect(result.array()));
            }
            else{
                return next();
            }
        });
    }
}



/**
 * Validate req params against schema
 */
Validator.params = function (schema){
    return function (req, res, next) {
        req.checkParams(schema);
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                return res.status(400).json('Invalid params: ' + util.inspect(result.array()));
            }
            else {
                return next();
            }
        });
    }
}


/**
 * Validate req query against schema
 */
Validator.query = function (schema){
    return function (req, res, next) {
        req.checkQuery(schema);
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                return res.status(400).json('Invalid query params: ' + util.inspect(result.array()));
            }
            else {
                return next();
            }
        });
    }
}


module.exports = Validator;