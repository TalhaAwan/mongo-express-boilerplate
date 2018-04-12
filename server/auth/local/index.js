'use strict';

const express = require( 'express')
const passport = require( 'passport')
const signToken = require( '../auth.service').signToken;

const validationSchema = require('../auth.validaton.schema');
const validator = require('../../utils/request.validator.js');

var router = express.Router();

router.post('/', validator.body(validationSchema.localSignIn), function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({token : token });
  })(req, res, next);
});

module.exports = router;
