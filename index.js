'use strict';

const port = process.env.PORT || 3000;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const redisOptions = {
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT
};

const redis = require('redis');

const pubsub = redis.createClient(redisOptions);
const redisClient = redis.createClient(redisOptions)

http.listen(process.env.PORT || 3001, function(){
  console.log('listening on *:3001');
});

pubsub.subscribe('champaign:actions');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/application.js', function(req, res){
  res.sendFile(__dirname + '/public/application.js');
});

app.get('/recent-actions', (req, res) => {
  const key = 'champaign:actions:cache';
  const min = 1;
  const max = -1;

  redisClient.zrevrange([key, min, max], (err, data) => {
    if (err) {
      return res.status(400).send({ errors: err });
    }

    res.send({ data: data.map(item => JSON.parse(item)) });
  });
});

io.on('connection', function(socket){
  socket.broadcast.emit('champaign:actions', {
    type: 'on connection'
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  pubsub.on('message', function (channel, message) {
    socket.emit('actions', message);
  });
});
