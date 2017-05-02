'use strict';

var Models = require('../Models');


//Insert User in DB
var createUser= function (objToSave, callback) {
    new Models.Customer(objToSave).save(callback)
};

//Get user from db
var getUsers = function (criteria, projection, options, callback) {
        Models.Customer.find(criteria, projection, options, callback);
};

var updateUser =function(criteria,projection,options,callback){
    Models.Customer.findOneAndUpdate(criteria,projection,options,callback)
};

module.exports = {
    createUser: createUser,
    getUsers:getUsers,
    updateUser:updateUser
 };
