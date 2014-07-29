// server.js 
var express 		= require('express');
var app 			= express();
var port	 		= process.env.PORT || 8080;

var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 	    = require('body-parser'); 
var session 		= require('express-session');
var mongoose	= require('mongoose');

mongoose.connect('mongodb://localhost:27017/joiusv1');


app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);
console.log('JoinUs Server listening on port 8080');
