const config = require("./config");

// Default Channel
const CONNECT = "connect";
const DISCONNECT = "disconnect";
// My Channels
const ROOM = "ROOM";
const SERVICE = "SERVICE";
// My Sub Channels
const GLOBAL_STAT = "GLOBAL_STAT";

var clients = []

module.exports = io => {
  io.on(CONNECT, socket => {
    let clientIp = socket.handshake.address.replace("::ffff:", "")
    socket.on(ROOM, _room => {
      // Add Client To List of Clients
      if (!clients.includes(clientIp)) {
        clients.push(clientIp)
        console.log("[+] conntectd => " + clientIp)
      }
      // Initial Data
      socket.emit(ROOM);
      socket.on(SERVICE, payload => {
        const channel = payload.channel;
        const data = payload.data;
        socket.broadcast.emit(SERVICE, { channel, data });
      });
    });

    socket.on(DISCONNECT, () => {
      if (clients.includes(clientIp)) {
        clients.splice(clients.indexOf(clientIp), 1)
        console.log("[-] disconntectd => " + clientIp)
      }
    });

    socket.on('connectivity', data => {
      io.emit('connectivity', { data: clients.includes(config.raspberry.ip) })
    });
  });
};