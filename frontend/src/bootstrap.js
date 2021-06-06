import Api from "./services/Api";
import io from "socket.io-client";
import config from "./config";
import { translator } from "./services/Translator";

const socket = io(config.api.socketApiPrefix, {
  // autoConnect: false
});

// Global Access
Window.prototype.api = new Api();
Window.prototype.tr = translator;
Window.prototype.socket = socket;
