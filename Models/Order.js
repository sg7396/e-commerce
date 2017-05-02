var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');


var Order= new Schema({
    userId: {type:Schema.ObjectId,ref:"Users",trim:true,required:true},
    supplierId : {type:Schema.ObjectId,ref:"supplier",trim:true,required:true},
    totalAmount: {type: Number, required: true},
    orderDate: {type: Date, default: Date.now},
    deliveryDate : {type: Date}
});

module.exports = mongoose.model('Order', Order);
