import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const port = 8807;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user is connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("user is disconnected-->");
  });
});

server.listen(port, () => {
  console.log("server was running on the port : ", port);
});
