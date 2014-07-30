// server.js 
var express 		= require('express');
var app 			= express();
var port	 		= process.env.PORT || 8080;

var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 	    = require('body-parser'); 
var session 		= require('express-session');
var mongoose	= require('mongoose');

//Include models
var UserEvent = require('./models/events.js');

mongoose.connect('mongodb://127.0.0.1:27017/joinusv1');


app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Get all events
app.get('/api/events',function(req,res){

    UserEvent.find(function(err,uevents){
    	if(err) res.send(err);

    	res.json(uevents);
    });
});

//Save an event
app.post('/api/events',function(req,res){

	console.log(req.body);
	 UserEvent.create({
		name: req.body.name,
    	description: req.body.description,
    	date: req.body.date,
    	author: req.body.author,
    	isPublic: req.body.isPublic,
    	type: req.body.type,
	 }, function(err,uevent){
	 		if(err)
	 			res.send(err);

	 		UserEvent.find(function(err,uevents){
	 			if(err) res.send(err);
	 			res.json(uevents);
 			});
	 });
});

//Get a single event
app.get('/api/event/:event_id',function(req,res){
	
	console.log('Get event with id ' + req.params.event_id);

	UserEvent.find({ _id: req.params.event_id },function(err,uevent)
	{
		if(err) res.send(err);
		res.send(uevent);
	});
})



//Delete an event
app.delete('/api/event/:event_id',function(req,res){

	console.log('Remove event with id '+ req.params.event_id);

 	UserEvent.remove({ _id: req.params.event_id }, function(err,userevent){
 		if(err) res.send(err);

 		UserEvent.find(function(err,events){
 			if(err) res.send(err);
 			res.json(events);
 		});
 	});
});



app.listen(port);
console.log('JoinUs Server listening on port 8080');

