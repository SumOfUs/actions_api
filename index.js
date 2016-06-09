var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    redis = require("redis").createClient();


redis.subscribe('champaign:actions');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/application.js', function(req, res){
  res.sendFile(__dirname + '/public/application.js');
});

redis.on('message', function (channel, message) {
  io.emit('actions', message);
});

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
