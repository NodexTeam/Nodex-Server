var registerSockets = function (io) {
    io.on('connection', function (socket) {
        console.log('connected', socket.id);
        // once a client has connected, we expect to get a ping from them saying what room they want to join

        socket.on('room', function (room) {
            console.log("At room " + room);
            socket.join(room, function () {

                io.sockets.in(room).emit('joined', "");
            });

        })
        socket.on('disconnect', () => {
            console.log(`DISconnected ${socket.id}`);
        });

        socket.on('notify', function (msg, listener) {
            io.sockets.in(msg.room).emit('notify', msg.msg);
        });

        socket.on('globalStat', function (msg, listener) {
            io.sockets.in(msg.room).emit('globalStat', msg.msg);
        });
        socket.on('storageInfo', function (msg, listener) {
            io.sockets.in(msg.room).emit('storageInfo', msg.msg);
        });

        socket.on('changeOptions', function (msg, listener) {
            console.log(msg);
            io.sockets.in(msg.room).emit('changeOptions', msg.msg);
        });

        socket.on('addDownload', function (msg, listener) {
            io.sockets.in(msg.room).emit('addDownload', msg.msg);
        });
        socket.on('downloading', function (msg, listener) {
            io.sockets.in(msg.room).emit('downloading', msg.msg);
        });

        socket.on('waiting', function (msg, listener) {
            io.sockets.in(msg.room).emit('waiting', msg.msg);
        });
        socket.on('stopped', function (msg, listener) {
            io.sockets.in(msg.room).emit('stopped', msg.msg);
        });
        socket.on('onPause', function (msg, listener) {
            io.sockets.in(msg.room).emit('onPause', msg.msg);
        });
        socket.on('onResume', function (msg, listener) {
            io.sockets.in(msg.room).emit('onResume', msg.msg);
        });
        socket.on('delete', function (msg, listener) {
            io.sockets.in(msg.room).emit('delete', msg.msg);
        });
        socket.on('peeng', function (msg, listener) {
            io.sockets.in(msg.room).emit('peeng', msg.msg);
        });
    });
}

module.exports = {
    registerSockets
}
