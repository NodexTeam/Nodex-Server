var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('globalStat', function(msg){
    io.emit('globalStat', msg);
    console.log('globalstats');
  });

  socket.on('addDownload', function(msg){
    io.emit('addDownload', msg);
    console.log('download added');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
