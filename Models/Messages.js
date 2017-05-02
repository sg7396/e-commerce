var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var Messages =new Schema({
    senderId:{type: Schema.ObjectId, ref: 'Users', required: true},
    receiverId:{type: Schema.ObjectId, ref : 'Supplier', required: true},
    message:{type: String, required: true},
    date:{type:Date, default:Date.now, required: true}
})

module.exports = mongoose.model('Messages', Messages);
