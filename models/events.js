var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userEventsSchema = new Schema({
    name: String,
    description: String,
    image: String,
    date: Date,
    author: String,
    isPublic: { type: Boolean, default: true },
    closed: { type: Boolean, default: false },
    type: String,
  	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserEvent', userEventsSchema);



