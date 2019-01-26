var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var socket = require("../Controllers/SocketController")
var path = require('path');

var run = function (){
    http.listen(port, function(){
        console.log('listening on *:' + port);
      });
    
      app.get('/', function(req, res){
        res.sendFile(path.join(__dirname,'./../','index.html'));
      });
    
      socket.registerSockets(io)
}

module.exports={
    run
};  

