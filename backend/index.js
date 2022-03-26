const express = require("express");
const app = express();
const config = require("./config/config");
const erroHandlers = require("./utils/middleware/errorHandlers");
var cookieParser = require("cookie-parser");
const validateToken = require("./utils/middleware/validateToken");
var cors = require("cors");
const connect = require("./utils/connection/mongose");
const serve = require("http").Server(app);
const io = require("socket.io")(serve, {
  cors: {
    origin: "*",
  },
});

//set
app.set("socketio", io);

// Apis
const session = require("./router/session.router");
const apiUser = require("./router/user.router");
const apiMensajes = require("./router/mensajes.router");
const apiMyUser = require("./router/myUser.router");
const apiSocket = require("./router/socket.router");

// Configuration
connect();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

//Routers
app.use("/api/session", validateToken, session);
app.use("/api/mensajes", validateToken, apiMensajes);
app.use("/api/user", apiUser);
app.use("/api/myUser", validateToken, apiMyUser);
app.use("/api/socket", validateToken, apiSocket);

// Static
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/public"));
app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Middleware
app.use(erroHandlers.boomThrow);
app.use(erroHandlers.catchError);

// Server
io.on("connection", function (socket) {});
serve.listen(config.port, () => {
  console.log(`Server in ${config.port}`);
});
