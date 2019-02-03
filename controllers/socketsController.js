var registerSockets = function (io) {
    io.on('connection', function (socket) {
        console.log('cooon ketets', socket.id);
        // once a client has connected, we expect to get a ping from them saying what room they want to join

        socket.on('room', function (room) {
            console.log(room);
            socket.join(room);
        })


        socket.on('globalStat', function (msg, listener) {
            console.log(msg);
            io.sockets.in(msg.room).emit('globalStat', msg.msg);
        });

        socket.on('addDownload', function (msg, listener) {
            io.sockets.in(msg.room).emit('addDownload', msg.msg);
        });
    });
}

module.exports = {
    registerSockets
}
