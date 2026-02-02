import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// tracking users
const users = {};

app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("register user", (username) => {
    users[socket.id] = username;
    io.emit("user list", users);
    console.log(`A user connected: ${socket.id} - ${username}`);
  });

  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    console.log(`Broadcasting to room: ${msg.roomId}`);
    msg.socketId = socket.id;
    io.to(msg.roomId).emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    console.log(`User disconnected: ${username}`);
    delete users[socket.id];
    io.emit("user list", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
