const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const login = require("./controllers/login");
require("dotenv").config();
const dataRoutes = require("./routes/data");

const app = express();
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
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (React app)
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running! Hello from Code Mavericks");
});
app.use("/api/v1/getData", dataRoutes);
app.use("/api/v1/login", login);

// Define roles for different users (optional, can be extended based on your logic)
const ROLES = {
  PARENT: "parent",
  ADMIN: "admin",
  DRIVER: "driver",
};

// Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle driver video stream (camera feed)
  socket.on("driverStream", (data) => {
    // Broadcast the video stream to all admins
    io.to("admin").emit("adminStream", data);
    console.log("Driver stream data sent to admin");
  });

  // Admin joins the "admin" room to receive the stream
  socket.on("joinAdminRoom", () => {
    socket.join("admin");
    console.log("Admin joined the room to receive the stream");
  });

  // Handle disconnection event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
