/** Express Server
 * @module server/app
 */

/**
 * @namespace appServer
 */
/**
 * Loading env variables to application
 */
require("dotenv").config();
/**
 * Importing mongoose connection
 */
const { mongoose } = require("./config/database");
const port = process.env.PORT;
/**
 * Express is a Node.js web application framework
 * @const
 */
const express = require("express");
const { consoleLogger } = require("./config/logger");
const HttpStatus = require("http-status-codes");
/**
 * CORS is a Node.JS package for providing a Connect/Express middleware that can be used to enable CORS
 * @const
 */
const cors = require("cors");
const app = express();
const path = require("path")
/**
 * Cross Origin Resource Sharing (CORS) allows us to use Web applications within browsers when domains aren't the same
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} cors - Enable cors in our application
 */
app.use(cors());
/**
 * Sends output in json format
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} express.json - Enable express to send json valie in our application
 */
app.use(express.json());
const http = require("http").createServer(app);
const socket = require("socket.io");
const io = socket.listen(http);

module.exports = {
  socket,
  io
};

/**
 * Passport.js as an authentication middleware.
 * @const
 */
const passport = require("passport");
const router = require("./config/routes");

http.listen(3001, () => {
  consoleLogger.info("Socket Connected at port :3001");
});
io.on("connection", socket => {
  consoleLogger.info("Client Connected");
  socket.on("event", event => {
    consoleLogger.info(event);
  });
  socket.on("disconnect", () => {
    consoleLogger.warn("Client disconnected");
  });
});
/**
 * Initializing Passport
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} initialize - Midddleware
 */
app.use(passport.initialize());

require("./api/middlewares/passport-local");

require("./api/middlewares/passport-jwt");
/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {string} root - Root Route
 * @param {callback} - request,response of the route
 */

/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {string} root - Root Route
 * @param {object} router - Express Router
 */
app.use("/user", router);

/**
 * Routes for hosting.
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {function} root - Root Route
 * @param {object} router - Express Router
 */
app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, () => {
  consoleLogger.info("Listening on port", port);
});
