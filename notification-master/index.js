let express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/1', function(req, res){
	res.sendfile('index1.html');
});
app.get('/2', function(req, res){
	res.sendfile('index2.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('notification', function(data){
		console.log('message from user '+ data.from + ' to user ' + data.to);
		console.log(data.msg);
 		io.emit('notification', data);
 
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(8080, function(){
	console.log('listening on port 8080');
})