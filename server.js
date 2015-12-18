var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRouter = require('./game/js/routes/api_routes.js');
var port = process.env.PORT || 3000;

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static('game'));

app.get('/', function(req, res){
	res.render('index');
})

app.listen(port, function() {
	console.log('listening on port', port);
});
