const util = require('util');
const Schema = {};

Schema.create = {
    'email': {
        optional: true,
        isEmail: {
            errorMessage: 'Invalid Email'
        }
    }
};

Schema.changePassword = {
    'oldPassword': {
        notEmpty: true,
        errorMessage: 'Invalid Password'
    },
    'newPassword': {
        notEmpty: true,
        errorMessage: 'Invalid Password'
    }
};

module.exports = Schema;