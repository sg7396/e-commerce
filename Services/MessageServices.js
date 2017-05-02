var Models = require('../Models');


//Insert User in DB
var createMessage= function (objToSave, callback) {
    new Models.Messages(objToSave).save(callback)
};

//Get user from db
var getMessage = function (criteria, projection, options, callback) {
        Models.Messages.find(criteria, projection, options, callback);
};


module.exports = {
    createMessage: createMessage,
    getMessage:getMessage,
 };