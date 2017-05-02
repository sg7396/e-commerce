var Models = require('../Models');


//Insert User in DB
var createSupplier= function (objToSave, callback) {
    new Models.Supplier(objToSave).save(callback)
};

//Get user from db
var getSupplier = function (criteria, projection, options, callback) {
        Models.Supplier.find(criteria, projection, options, callback);
};

var updateSupplier =function(criteria,projection,options,callback){
    Models.Supplier.findOneAndUpdate(criteria,projection,options,callback)
};


module.exports = {
    createSupplier: createSupplier,
    getSupplier:getSupplier,
    updateSupplier:updateSupplier
 };