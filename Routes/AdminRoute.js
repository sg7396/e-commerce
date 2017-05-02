var Controller = require('../Controllers');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var Joi = require('joi');

module.exports =[
    {
        method: 'POST',
        path: '/admin/Newlogin',
        config: {
            description: 'Login for Super Admin',
            tags: ['api', 'admin'],
            handler: function (request, reply) {
                var queryData = {
                    email: request.payload.email,
                    password: request.payload.password,
                };
                Controller.AdminController.adminLogin(queryData, function (err, data) {
                    if (err) {
                        reply(UniversalFunctions.sendError(err))
                    } else {
                        reply(UniversalFunctions.sendSuccess(null, data))
                    }
                })
            },
            validate: {

                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction,
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
        path: '/admin/addCategory',
        handler: function (request, reply) {
            var payloadData = request.payload;

            Controller.AdminController.addCategory(payloadData,function (err, data) {
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
                    description: Joi.string().required(),
                    PicURL: Joi.any()
                        .meta({swaggerType: 'file'})
                        .optional()
                        .description('image file')
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





];