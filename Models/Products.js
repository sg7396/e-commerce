var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var Products =new Schema({
    supplierId:{type:Schema.ObjectId, ref:"Supplier", required:true},
    category:{type: String, required: true},
    name: {type: String, required: true},
    price : {type: Number, required: true},
    quantity :{type: Number, required: true},
    size:{type: String, required: true},
        color:{type: String, required: true},
        brand:{type: String, required: true},
        description:{type: String, default:null}
});

module.exports = mongoose.model('Products', Products);
