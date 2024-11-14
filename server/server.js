// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with Vite frontend URL
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running! Hello from Code mavericks");
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
