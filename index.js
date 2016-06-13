
//var server = require('http').createServer(app);
//var io = require('../..')(server);
var port = process.env.PORT || 3000;


var app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http);

var redisOptions = {
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT
};

http.listen(process.env.PORT || 3001, function(){
  console.log('listening on *:3001');
});

var redis = require("redis").createClient(redisOptions);

redis.subscribe('champaign:actions');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/application.js', function(req, res){
  res.sendFile(__dirname + '/public/application.js');
});

io.on('connection', function(socket){
  socket.broadcast.emit('champaign:actions', {
    type: 'on connection'
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  redis.on('message', function (channel, message) {
    socket.emit('actions', message);
  });
});


