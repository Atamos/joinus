// server.js 
var express = require('express');
var fs = require('fs');
var morgan 	= require('morgan');  //logger

var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var session  = require('express-session');
var mongoose = require('mongoose');

//Include models
var events = require('./routes/events');

//Variables
var config = require(__dirname +'/config.json')[app.get('env')];
var accessLogStream = fs.createWriteStream(__dirname + '/'+config.log_file,{flags: 'a'});


console.log('Using: '+app.get('env'));
console.log('Using log: '+ config.log_file);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan({stream: accessLogStream}));


mongoose.connect('mongodb://'+config.db_host+':'+config.db_port+'/'+config.db_name);
//mongoose.connect('mongodb://127.0.0.1:27017/joinusv1');
var port = process.env.PORT || config.srv_port;
//var port = process.env.PORT || 8080;

var router = express.Router();


router.use(function(req,res,next){
	console.log('Request from '+ req.ip);
	next();
});



//Main route - Based on enviroment 
if('production' == app.get('env')){
	router.get('/',function(req,res){
		res.json({ message: 'Welcome to JoinUs api'});
	});
}

if('development' == app.get('env')){
	router.get('/',function(req,res){
		res.send('Bazinga!!!' );
	});
}


//Events routes 
router.route('/events')
	.post(events.createNew)
	.get(events.findAll);

router.route('/event/:event_id')
	.get(events.findById)
	.put(events.updateById)
	.delete(events.deleteById);



app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.use('/api',router);




app.listen(port);
console.log('JoinUs Server listening on port 8080');

