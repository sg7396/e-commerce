var Controller = require('../Controllers');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var Joi = require('joi');


module.exports = [
    {
        method: 'POST',
        path: '/customer/register',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.createUser(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'Register users',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    name: Joi.string().regex(/^[a-zA-Z ]+$/).trim().min(2).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(5).trim(),
                    address:Joi.string().required(),
                    mob_Number: Joi.number().required().min(10),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode : Joi.number().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/customer/login',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.loginUsers(payloadData, function (err, data) {
                //reply(UniversalFunctions.sendSuccess(null,err))
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            });
        },
        config: {
            description: 'Login Via Email & Password For users',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(5).trim(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

    ////////////////message////////////

    {
        method: 'POST',
        path: '/customer/messaging',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.messaging(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'send message to supplier',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    accessToken:Joi.string().required(),
                    receiverId:Joi.string().required(),
                    message: Joi.string().required(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },


////////////////////////supplierlist//////////

{
        method: 'POST',
        path: '/customer/supplierlist',
        handler: function (request, reply) {
            //var payloadData = request.payload;
            Controller.UserController.supplierList(function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'supplier search using city',
            tags: ['api', 'users'],
            validate: {
                // payload: {
                //     accessToken:Joi.string().required(),
                // },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
///////////////////////////message sende//////////////

{
        method: 'POST',
        path: '/customer/supplierInTalk',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.messageSenderList(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'supplier in talk',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    accessToken:Joi.string().required(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

//////////////////////////view message////////////

{
        method: 'POST',
        path: '/customer/viewMessage',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.viewMessage(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'supplier in talk',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    accessToken:Joi.string().required(),
                    receiverId:Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
/////////////////////////////
{
        method: 'POST',
        path: '/customer/viewProductbycategory',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.viewProductBYcategory(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'product by category',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    category:Joi.string().required(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
//////////////////////////////
{
        method: 'POST',
        path: '/customer/viewProductbysupplier',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.viewProductBysupplierId(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'product by supplier',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    supplierId:Joi.string().required(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
///////////////////////////


{
        method: 'POST',
        path: '/customer/orderProduct',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.orderProduct(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'order product',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    accessToken:Joi.string().required(),
                    productId:Joi.string().required(),
                    quantity:Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

    //////////////////////////////////supplier routes/////////////

    {
        method: 'POST',
        path: '/supplier/register',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.createSupplier(payloadData, function (err, data) {
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED, data)).code(201)
                }
            });
        },
        config: {
            description: 'Register supplier',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    name: Joi.string().regex(/^[a-zA-Z ]+$/).trim().min(2).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(5).trim(),
                    address:Joi.string().required(),
                    storeName:Joi.string().required(),
                    phoneNo: Joi.number().required().min(10),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode : Joi.number().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/supplier/login',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.loginSupplier(payloadData, function (err, data) {
                //reply(UniversalFunctions.sendSuccess(null,err))
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            });
        },
        config: {
            description: 'Login Via Email & Password For supplier',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(5).trim(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

{
        method: 'POST',
        path: '/supplier/addProduct',
        handler: function (request, reply) {
            var payloadData = request.payload;
            Controller.UserController.loginSupplier(payloadData, function (err, data) {
                //reply(UniversalFunctions.sendSuccess(null,err))
                if (err) {
                    reply(UniversalFunctions.sendError(err));
                } else {
                    reply(UniversalFunctions.sendSuccess(null, data))
                }
            });
        },
        config: {
            description: 'Login Via Email & Password For supplier',
            tags: ['api', 'users'],
            validate: {
                payload: {
                    accessToken:Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required().min(5).trim(),
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

];