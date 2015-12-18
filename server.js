var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRouter = require('./game/js/routes/api_routes.js');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/encrypt', function(){
	console.log('Mongodb connected to db:encrypt')
 })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static('game'))

app.get('/', function(req, res){
	res.render('index.html');
})

app.post('/score', function(req,res){
	// save the game to the user to the database
	req.body.score
})

app.listen(port, function() {
	console.log('listening on port', port)
})
