import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Initiating the express server
const app = express();

// Middlewares
app.use(cors());

// Creating an HTTP server since socket.io uses it
const server = http.createServer(app);

// Making a new instance of the socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("join_room", (data) => {
    console.log(data)
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("received_message", data);
    console.log(data.message)
  });
});

// Listening part of the server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
