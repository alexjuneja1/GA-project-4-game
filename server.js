var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('game'));

app.get('/', function(req, res){
	res.render('index');
})

app.listen(port, function() {
	console.log('listening on port', port);
});
