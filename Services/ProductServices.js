var Models = require('../Models');


//Insert User in DB
var createProduct= function (objToSave, callback) {
    new Models.Products(objToSave).save(callback)
};

//Get user from db
var getProducts = function (criteria, projection, options, callback) {
        Models.Products.find(criteria, projection, options, callback);
};


module.exports = {
    createProduct: createProduct,
    getProducts:getProducts,
 };