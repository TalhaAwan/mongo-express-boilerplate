/**
 * Express configuration
 */

'use strict';

const express =   require('express');
// const favicon =   require('serve-favicon');
const morgan =   require('morgan');
const bodyParser =   require('body-parser');
const expressValidator = require('express-validator');
const methodOverride =   require('method-override');
const cookieParser =   require('cookie-parser');
const cors =   require('cors');
const errorHandler =   require('errorhandler');
const path =   require( 'path');
const config =   require( './environment');
const passport  =   require( 'passport');
const session =   require( 'express-session');
const mongoose =   require( 'mongoose');

module.exports = function(app) {
    var env = app.get('env');

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    if(env === 'development' || env === 'test') {
        app.use(errorHandler()); // Error handler - has to be last
    }
}
