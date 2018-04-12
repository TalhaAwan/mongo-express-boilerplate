'use strict';

const path = require('path');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // All undefined routes should return a 404
  app.route('/:url(api|auth)/*')
   .get(function(req, res){
       res.status(404);
   });


}
