var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');


var Customer = new Schema({
    name: {type: String, trim: true, index: true, default: null, sparse: true},
    mob_Number: {type: String, trim: true, sparse: true, index: true, unique: true, min: 5, max: 15},
    email: {type: String, trim: true, unique: true, index: true,sparse: true},
    password: {type: String,default:null},
    phoneNo: {type: String, trim: true, index: true, min: 5, max: 15},
    registrationDate: {type: Date, required: true},
    accessToken: {type: String, trim: true, index: true},
    address: {type: String, default: null},
    city :{type: String, default: null},
    state:{type: String, default: null},
    zipcode:{type: String, default: null},
    isLogin:{type:Boolean, default: false}
});


module.exports = mongoose.model('Customer', Customer);
