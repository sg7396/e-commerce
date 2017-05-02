var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var Supplier = new Schema({
    name: {type: String, trim: true, index: true, default: null, sparse: true},
    email: {type: String, trim: true, unique: true, index: true,sparse: true},
    password: {type: String,default:null},
    registrationDate: {type: Date, default: Date.now, required: true},
    accessToken: {type: String, trim: true, index: true},
    storeName: {type: String, default: null},
    address: {type: String, default: null},
    city: {type: String, default: null},
    state: {type: String, default: null},
    zipcode: {type: String, default: null},
    phoneNo: {type: String, default: ''},
    isLogin:{type:Boolean, default:false}
    //coordinate: {type:[Number], index:true}
});

module.exports = mongoose.model('Supplier', Supplier);
