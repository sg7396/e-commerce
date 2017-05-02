
'use strict';
var UserRoutes = require('./UserRoutes');
//var AdminRoute = require('./AdminRoute');
var AdminRoute = require('./AdminRoute');




var all = [].concat(UserRoutes,AdminRoute);
module.exports = all;

