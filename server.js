const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");

// Create App And Init Sockets
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("./socket")(io);

// Constance
const db = config.database;
const conf = config.server;

// Morgan Logger
const loggerFormat = '":method :url" :status :response-time';

app.use(
  morgan(loggerFormat, {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr
  })
);

app.use(
  morgan(loggerFormat, {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout
  })
);

// App Usecase
app.use(bodyParser.json({ limit: config.server.limit }));
app.use(bodyParser.urlencoded({ limit: config.server.limit, extended: true }));
app.use("/static", express.static("build/static"));
app.use("/website", express.static("website"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
// appRoutes(app);
app.get("/website", function (req, res) {
  res.sendFile(config.paths.website);
});
app.get("/*", function (req, res) {
  res.sendFile(config.paths.buildHtml);
});

// Serve
server.listen(conf.port, () => {
  console.log(conf.onConnect + conf.ip + ":" + conf.port);
});