// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const login = require("./controllers/login");
require("dotenv").config();
const dataRoutes = require("./routes/data");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://trackin.surge.sh"],
    credentials: true,
  })
);
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application in case of error
  }
};

// Call MongoDB connection function
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running! Hello from Code Mavericks");
});

app.use("/api/v1/getData", dataRoutes);
app.use("/api/v1/login", login);

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
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
