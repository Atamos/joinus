// server.js 
var express 		= require('express');
var app 			= express();

var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 	    = require('body-parser'); 
var session 		= require('express-session');
var mongoose	= require('mongoose');

//Include models
var UserEvent = require('./models/events.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/joinusv1');
var port = process.env.PORT || 8080;


var router = express.Router();

router.use(function(req,res,next){
	console.log('Something is happening');
	next();
});

router.get('/',function(req,res){
	res.json({ message: 'Welcome to JoinUs api'});
});


router.route('/events')
	.post(function(req,res){
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
	})
	.get(function(req,res){

		UserEvent.find(function(err,uevents){
    		if(err) res.send(err);

    		res.json(uevents);
    	});
	});



router.route('/event/:event_id')
	.get(function(req,res){
	
		console.log('Get event with id ' + req.params.event_id);

		UserEvent.findOne({ _id: req.params.event_id },function(err,uevent)
		{
			if(err) res.send(err);
			res.send(uevent);
		});
	})
	.put(function(req,res){
		console.log('Update event with id '+ req.params.event_id);
		
		UserEvent.findById(req.params.event_id,function(err,uevent){

			if(err) res.send(err);
			
			uevent.name =  req.body.name;
	    	uevent.description =  req.body.description;
	    	uevent.date =  req.body.date;
	    	uevent.author =  req.body.author;
	    	uevent.isPublic =  req.body.isPublic;
	    	uevent.type =  req.body.type;

	    	uevent.save(function(err){
	    		if(err) res.send(err);
	    		res.json({message: 'success'});
	    	});

		});
	})
	.delete(function(req,res){
		console.log('Remove event with id '+ req.params.event_id);
 		
 		UserEvent.remove({ _id: req.params.event_id }, function(err,userevent){
	 		if(err) res.send(err);

	 		UserEvent.find(function(err,events){
	 			if(err) res.send(err);
	 			res.json(events);
	 		});
 		});
 	});


app.use('/api',router);




app.listen(port);
console.log('JoinUs Server listening on port 8080');

