import "dotenv/config";
import { mongoose } from "./config/database";
import express from "express";
import { consoleLogger } from "./config/logger";
import HttpStatus from "http-status-codes";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import passport from "passport";
import router from "./config/routes";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 3000;
const socketPort = process.env.SOCKETPORT || 3001;

export const socket = require("socket.io");
export { io };

io.on("connection", (socket) => {
  consoleLogger.info("Client Connected");
  socket.on("disconnect", () => {
    consoleLogger.warn("Client disconnected");
  });
});

app.use(passport.initialize());

require("./api/middlewares/passport-local");
require("./api/middlewares/passport-jwt");

app.use("/user", router);
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

httpServer.listen(Number(socketPort), () => {
  consoleLogger.info(`Socket Connected at port : ${socketPort}`);
});
app.listen(Number(port), () => {
  consoleLogger.info(`Express Connected at port : ${port}`);
});
