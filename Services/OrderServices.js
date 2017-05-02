var Models = require('../Models');


//Insert User in DB
var createOrder= function (objToSave, callback) {
    new Models.Order(objToSave).save(callback)
};

//Get user from db
var getOrder = function (criteria, projection, options, callback) {
        Models.Order.find(criteria, projection, options, callback);
};


module.exports = {
    createOrder: createOrder,
    getOrder:getOrder,
 };