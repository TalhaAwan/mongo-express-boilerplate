'use strict';

const jwt = require ( 'jsonwebtoken');

const User = require ( './user.model');
const config = require ( '../../config/environment');
const Controller = {};

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
}



/**
 * Get list of users
 * restriction: 'admin'
 */
Controller.index = function (req, res) {
    return User.find({}, '-salt -password').exec()
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(handleError(res));
};



/**
 * Creates a new user
 */
Controller.create = function (req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save()
        .then(function (user) {
            var token = jwt.sign({_id: user._id}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({token: token});
        })
        .catch(validationError(res));
};



/**
 * Get a single user
 */
Controller.show = function (req, res, next) {
    var userId = req.params.id;

    return User.findById(userId).exec()
        .then(function (user) {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(function (err) {
            next(err)
        });
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
Controller.destroy = function (req, res) {
    return User.findByIdAndRemove(req.params.id).exec()
        .then(function () {
            res.status(204).end();
        })
        .catch(handleError(res));
};



/**
 * Change a users password
 */
Controller.changePassword = function (req, res) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.findById(userId).exec()
        .then(function (user) {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.save()
                    .then(function () {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
};



/**
 * Get my info
 */
Controller.me = function (req, res, next) {
    var userId = req.user._id;

    return User.findOne({_id: userId}, '-salt -password').exec()
        .then(function (user) { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            return res.json(user);
        })
        .catch(function (err) {
            next(err)
        });
};



/**
 * Authentication callback
 */
Controller.authCallback = function (req, res) {
    res.redirect('/');
}

module.exports = Controller;
