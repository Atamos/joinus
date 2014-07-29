var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    name: String,
    description: String,
    image: String,
    date: Date,
    author: String,
    isPublic: Boolean,
    closed: Boolean,
    type: String,
  	createdAt: { type: Date, default: Date.now },
});

var Event = mongoose.model('Event', eventsSchema);