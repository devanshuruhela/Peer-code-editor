const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
// const cors = require('cors');
const { Server } = require("socket.io");
const ACTIONS = require("./src/actions");
// const { Action } = require("history");


const io = new Server(server);

// app.use(cors());
const PORT = process.env.PORT || 5000;
const userSocketMap = {};
function getAllconnectedclients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log('socket connected', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllconnectedclients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on('disconnecting' , ()=>
  {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId)=>
    {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
        socketId:socket.id,
        username:userSocketMap[socket.id],
      });
    })

    delete userSocketMap[socket.id];
    socket.leave();
  } )
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
