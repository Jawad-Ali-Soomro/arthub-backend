const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const connectDatabase = require("./config/db.config");
const user_route = require("./routes/user");
const art_route = require("./routes/art");
const series_route = require("./routes/series");
const deal_route = require("./routes/deal");
const message_router = require("./routes/message");
const conversation_router = require("./routes/conversation");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust the origin based on your setup
  },
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Connect to the database
connectDatabase();

// API routes
app.use("/api/v1/user", user_route);
app.use("/api/v1/art", art_route);
app.use("/api/v1/series", series_route);
app.use("/api/v1/deal", deal_route);
app.use("/api/v1/conversations", conversation_router);
app.use("/api/v1/messages", message_router);

// Online users tracking
let onlineUsers = [{}];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user coming online
  socket.on("userOnline", (userId) => {
    onlineUsers.push(...onlineUsers, socket.id);
    console.log(`User ${userId} is online`);
    io.emit("onlineUsers", onlineUsers); // Broadcast updated list
    console.log("Online users:", onlineUsers); // Log the current list of online users
  });

  // Handle user going offline
  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        console.log(`User ${userId} is offline`);
        delete onlineUsers[userId];
        break;
      }
    }
    io.emit("onlineUsers", onlineUsers);
    console.log("Updated online users after disconnect:", onlineUsers);
  });

  // Optional: Handle user explicitly going offline
  socket.on("userOffline", (userId) => {
    delete onlineUsers[userId];
    console.log(`User ${userId} manually went offline`);
    io.emit("onlineUsers", onlineUsers);
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
