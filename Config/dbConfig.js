'use strict';

var mongo = {
    URI: process.env.MONGO_URI || 'mongodb://localhost/seedProject',
    port: 27017
};


module.exports = {
    mongo: mongo
};