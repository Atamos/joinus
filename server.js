// server.js 
var express 		= require('express');
var app 				= express();
var port	 			= process.env.PORT || 8000;
// var mongoose	= require('mongoose');
var passport 		= require('passport');
var flash 			= require('connect-flash');

var morgan 			= require('morgan');
var cockieParser 	= require('cookie-parser');
var bodyParser 	= require('body-parser'); 
var session 		= require('express-session');