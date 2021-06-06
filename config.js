const path = require("path");

const ip = "127.0.0.1";
const port = 8585;

module.exports = {
  // database: {
  //   ip: "localhost",
  //   port: 27017,
  //   name: "dbox",
  //   onConnect: `Connected to MongoDb`,
  //   onError: `Unable to connect MongoDB server`
  // },
  raspberry: {
    ip: "192.168.1.3"
  },
  server: {
    ip,
    port,
    host: `http://${ip}:${port}/`,
    limit: "10000mb",
    onConnect: `HTTP Server Is Running → `,
    onError: `We Have Problem. stopping server.`
  },
  paths: {
    buildHtml: path.resolve("./build/index.html"),
    // website: path.resolve("./website/website.html")
  }
};