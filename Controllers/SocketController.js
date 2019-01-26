var registerSockets =function(io)
{
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
}

module.exports = {
    registerSockets
}
