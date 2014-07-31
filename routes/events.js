var UserEvent = require('../models/events.js');

exports.findAll = function(req,res){
	
	UserEvent.find(function(err,uevents){
    	if(err) res.send(err);
    	res.json(uevents);
	});
};

exports.findById =  function(req,res){
	console.log('Get event with id ' + req.params.event_id);

	UserEvent.findOne({ _id: req.params.event_id },function(err,uevent)
	{
		if(err) res.send(err);
		res.send(uevent);
	});
};

exports.createNew = function(req,res){
	
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
};

exports.updateById = function(req,res){
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
};


exports.deleteById = function(req,res){
	console.log('Remove event with id '+ req.params.event_id);
	
	UserEvent.remove({ _id: req.params.event_id }, function(err,userevent){
 		if(err) res.send(err);

 		UserEvent.find(function(err,events){
 			if(err) res.send(err);
 			res.json(events);
 		});
	});
};