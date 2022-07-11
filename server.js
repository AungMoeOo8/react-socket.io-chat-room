const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.user;
  const currentTime = Date.now();
  const socketId = socket.id;
  socket.broadcast.emit("clientConnect", { socketId, username, currentTime });

  socket.on("message", (message) =>
    // socket.broadcast.emit("message", { username, message, currentTime })
    io.emit("message", { socketId, username, message, currentTime })
  );

  socket.on("joinRoom", (data) => {
    socket.join(data);
    socket.emit("joinRoom", data);
    console.log(socket.rooms);
  });

  socket.on("disconnect", (reason) =>
    socket.broadcast.emit("clientDisconnect", { reason, username, currentTime })
  );
});

httpServer.listen(PORT, () => console.log("server listening on port " + PORT));
