const util = require('util');
const Schema = {};

Schema.localSignIn = {
    'email': {
        notEmpty: true,
        isEmail: {
            errorMessage: 'Invalid Email'
        }
    },
    'password': {
        notEmpty: true,
        errorMessage: 'Invalid Password' // Error message for the parameter
    }
};


module.exports = Schema;