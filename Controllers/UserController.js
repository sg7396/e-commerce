'use strict';
var Service = require('../Services');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var async = require('async');
var emailPass=require('../emailPass')
var UploadManager = require('../Lib/UploadManager');
var TokenManager = require('../Lib/TokenManager');
var NotificationManager = require('../Lib/NotificationManager');
var CodeGenerator = require('../Lib/CodeGenerator');
var Config=require('../Config');
var moment=require('moment');
var Models = require('../Models');
var GeoPoint = require("geopoint");
var geocoder = require('geocoder');



var createUser=function (payloadData, callback) {
    var dataToSave = payloadData;
    dataToSave.accessToken=((Math.random()*10000000000).toString());
    if (dataToSave.password)
        dataToSave.password = UniversalFunctions.CryptData(dataToSave.password);
   var userData;
    async.series([
        function (cb) {
            //verify email address
            if (!UniversalFunctions.verifyEmailFormat(dataToSave.email)) {
                cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL);
            } else {
                cb();
            }
        },

        function (cb) {
            //Insert Into DB
            dataToSave.registrationDate = new Date().toISOString();
            Service.UserServices.createUser(dataToSave, function (err, userDataFromDB) {
                if (err) {

                    if (err.code == 11000 && err.message.indexOf('customers.$phoneNo_1') > -1){
                        cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_NO_EXIST);

                    } else if (err.code == 11000 ){
                        cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);

                    }else {
                        cb(err)
                    }
                } else {
                    userData = userDataFromDB;
                    cb();
                }
            })
        },
    ], function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, userData);
        }
    });
};


var loginUsers = function (payloadData, callback) {
    var userFound = false;
    var response;
    async.series([
        function (cb) {
            var criteria = {
                email: payloadData.email
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.UserServices.getUsers(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    cb();
                }
            });
        },
        function (cb) {
            //validations
            if (!userFound) {
                cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_NOT_FOUND);
            }
            else {
                if (userFound && userFound.password != UniversalFunctions.CryptData(payloadData.password)) {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD);
                } else {
                    var datatoUpdate={
                        accessToken:((Math.random()*10000000000).toString()),
                        isLogin:true
                    };
                    Service.UserServices.updateUser({email:payloadData.email},datatoUpdate,{lean:true},function(err,res){
                        if(err){
                            cb(err)
                        }else{
                            response=res;
                            cb(null)
                        }
                    })
                }
            }
        },
    ], function (err, data) {
        if (err) {
            callback(err);
        } else {
            console.log("amannnnnnn")
            callback(null,response);
        }
    });
};


var messaging = function(payloadData,callback){
    var userFound;
    async.series([
         function (cb) {
            var criteria = {
                accessToken: payloadData.accessToken
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.UserServices.getUsers(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    cb(null);
                }
            });
        },
        function(cb){
            var criteria={
                senderId:userFound._id,
                receiverIds:payloadData.receiverId,
                message:payloadData.message
            };
            Service.MessageServices.createMessage(criteria,function(err,res){
                if(err){
                    cb(err)
                }else{
                    cb(null)
                }
            })
        }
    ],function(err,result){
        if(err){
            callback(err)
        }else{
            var msg='message sent'
            callback(null,msg)
        }
    })
};

var supplierList=function(callback){
    var responseTosend;
    var ucity;
    async.auto({
        // getUserCity:function(cb){
        //     var criteria={
        //         accessToken:payloadData.accessToken
        //     };
        //     Service.UserServices.getUsers(criteria,{city:1},{lean:true},function(err,res){
        //         if(err){
        //             cb(err)
        //         }else{
        //             console.log(res)
        //             ucity=res[0].city;
        //             cn(null)
        //         }
        //     })
        // },
        getSuppliers:function(cb){
            var criteria={
                //city:ucity
            };
            var projection={
                _id:1,
                name:1,
                storeName:1,
                address:1
            };
            Service.SupplierServices.getSupplier(criteria,projection,{lean:true},function(err,res){
                if(err){
                    cb(err)
                }else{
                    //responseTosend=result;
                    console.log(res)
                    cb(null)
                }
            })
        }

    },function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

var messageSenderList = function(payloadData,callback){
    var userFound;
    var supplierLIst;
    async.series([
         function (cb) {
            var criteria = {
                accessToken: payloadData.accessToken
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.UserServices.getUsers(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    cb(null);
                }
            });
        },
        function(cb){
            var criteria={
                senderId:userFound._id
            };
            var projection={
                receiverId:1
            };
            var option={
                lean:true
            };
            // var populate=[

            // ];
            Service.MessageServices.getMessage(criteria,function(err,res){
                if(err){
                    cb(err)
                }else{
                    supplierLIst=res;
                    cb(null)
                }
            })
        }
    ],function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,supplierLIst)
        }
    })
};


var viewMessage = function(payloadData,callback){
    var userFound;
    var msg;
    async.series([
         function (cb) {
            var criteria = {
                accessToken: payloadData.accessToken
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.UserServices.getUsers(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    cb(null);
                }
            });
        },
        function(cb){
            var criteria={
                senderId:userFound._id,
                receiverIds:payloadData.receiverId,
            };
            Service.MessageServices.getMessage(criteria,function(err,res){
                if(err){
                    cb(err)
                }else{
                    msg=res;
                    cb(null)
                }
            })
        }
    ],function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,msg)
        }
    })
};


var viewProductBYcategory = function(payloadData,callback){
    var userFound;
    var msg;
    async.series([
         function (cb) {
            var criteria = {
                category: payloadData.category
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.ProductServices.getProducts(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result || null;
                    cb(null);
                }
            });
        }
    ],function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,userFound)
        }
    })
};

var viewProductBysupplierId = function(payloadData,callback){
    var userFound;
    var msg;
    async.series([
         function (cb) {
            var criteria = {
                supplierId: payloadData.supplierId
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.ProductServices.getProducts(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result || null;
                    cb(null);
                }
            });
        }
    ],function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,userFound)
        }
    })
};

var orderProduct = function(payloadData,callback){
    var userData;
    var userData1;
    var price;
    var netPrice;
    async.auto({
        getUsers:function(cb){
            var criteria = {
                accessToken: payloadData.accessToken
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.UserServices.getUsers(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    if(result[0].isLogin == true){
                        userData=result[0]._id
                        cb(null)
                    }else{
                        callback("Please login first")
                    }
                }
            });
        },
        getSupplier:function(cb){
            var criteria = {
                _id: payloadData.productId
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.ProductServices.getProducts(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    if(result){
                        userData1=result[0].supplierId;
                        price=result[0].price;
                        cb(null)
                    }else{
                        cb(null)
                    }
                }
            });
        },
        createOrder:['getUsers','getSupplier',function(cb){
            var targetDate = new Date();
            var dataToSave={
                productId:payloadData.productId,
                supplierId:userData1,
                totalPrice:(payloadData.quantity)*price,
                deliveryDate:targetDate.setDate(targetDate.getDate() + 3)    
            };
            Service.OrderServices.createOrder(dataToSave,function(err,res){
                if(err){
                    cb(err)
                }else{
                    cb(null)
                }
            })
        }],
        updateProduct:['createOrder',function(cb){
            var criteria={
                _id:payloadData
            };
            var datatoUpdate={
                $inc:{quantity:-quantity}
            }
        }]
    },function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,"order placed")
        }
    })
};








//////////////////////////////supplier//////////////////



var createSupplier=function (payloadData, callback) {
    var dataToSave = payloadData;
    dataToSave.accessToken=((Math.random()*10000000000).toString());
    if (dataToSave.password)
        dataToSave.password = UniversalFunctions.CryptData(dataToSave.password);
   var userData;
    async.series([
        function (cb) {
            //verify email address
            if (!UniversalFunctions.verifyEmailFormat(dataToSave.email)) {
                cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL);
            } else {
                cb();
            }
        },

        function (cb) {
            //Insert Into DB
            dataToSave.registrationDate = new Date().toISOString();
            Service.SupplierServices.createSupplier(dataToSave, function (err, userDataFromDB) {
                if (err) {

                    if (err.code == 11000 && err.message.indexOf('customers.$phoneNo_1') > -1){
                        cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_NO_EXIST);
                    } else if (err.code == 11000 ){
                        cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
                    }else {
                        cb(err)
                    }
                } else {
                    userData = userDataFromDB;
                    cb();
                }
            })
        },
    ], function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, userData);
        }
    });
};


var loginSupplier = function (payloadData, callback) {
    var userFound = false;
    var response;
    async.series([
        function (cb) {
            var criteria = {
                email: payloadData.email
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.SupplierServices.getSupplier(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    cb();
                }
            });
        },
        function (cb) {
            //validations
            if (!userFound) {
                cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_NOT_FOUND);
            }
            else {
                if (userFound && userFound.password != UniversalFunctions.CryptData(payloadData.password)) {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD);
                } else {
                    var datatoUpdate={
                        accessToken:((Math.random()*10000000000).toString()),
                        isLogin:true
                    };
                    Service.SupplierServices.updateSupplier({email:payloadData.email},datatoUpdate,{lean:true},function(err,res){
                        if(err){
                            cb(err)
                        }else{
                            response=res;
                            cb(null)
                        }
                    })
                }
            }
        },
    ], function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null,response);
        }
    });
};


var addProduct=function(payloadData,callback){
    async.auto({
        checkSupplier:function (cb) {
            var criteria = {
                accessToken: payloadData.accessToken
            };
            var projection = {};
            var option = {
                lean: true
            };
            Service.SupplierServices.getSupplier(criteria, projection, option, function (err, result) {
                if (err) {
                    cb(err)
                } else {
                    userFound = result && result[0] || null;
                    if(userFound && userFound.isLogin){
                        cb(null)
                    }else{
                        callback('please login first')
                    }
                }
            });
        },
        insertProduct:[function(cb){
            payloadData.accessToken=undefined;
            var dataToSave=payloadData;
            Service.ProductServices.createProduct(dataToSave,function(err,result){
                if(err){
                    cb(err)
                }else{
                    cb(null)
                }
            })
        }]
    },function(err,result){
        if(err){
            callback(err)
        }else{
            callback(null,"product Added")
        }
    })
}


module.exports = {
    createUser:createUser,
    loginUsers:loginUsers,
    messaging:messaging,
    supplierList:supplierList,
    messageSenderList:messageSenderList,
    viewMessage:viewMessage,
    viewProductBYcategory:viewProductBYcategory,
    viewProductBysupplierId:viewProductBysupplierId,
    orderProduct:orderProduct,
    createSupplier:createSupplier,
    loginSupplier:loginSupplier
};