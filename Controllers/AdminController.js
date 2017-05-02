'use strict';

var Service = require('../Services');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var async = require('async');

var UploadManager = require('../Lib/UploadManager');
var TokenManager = require('../Lib/TokenManager');
var NotificationManager = require('../Lib/NotificationManager');
var fs = require('fs');
var path = require('path');
var im = require('imagemagick')


var adminLogin = function(userData, callback) {

    var tokenToSend = null;
    var responseToSend = {};
    var tokenData = null;
    async.series([
        function (cb) {
            var getCriteria = {
                email: userData.email,
                password: UniversalFunctions.CryptData(userData.password)
                // password:userData.password
            };
            Service.AdminService.getAdmin(getCriteria, {}, {}, function (err, data) {
                if (err) {
                    cb({errorMessage: 'DB Error: ' + err})
                } else {
                    if (data && data.length > 0 && data[0].email) {
                        tokenData = {
                            id: data[0]._id,
                            username: data[0].username,
                            type : UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN
                        };
                        cb()
                    } else {
                        cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_USER_PASS)
                    }
                }
            });
        },
        ],
        function (err, data) {
        console.log('sending response')
        responseToSend = {access_token: tokenToSend};
        if (err) {
            callback(err);
        } else {
            callback(null,responseToSend)
        }

    });
};

module.exports = {
    adminLogin: adminLogin,
};