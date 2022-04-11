const express = require('express')
const app = express();
const http = require("http");

// const path = require("path");
const {
  Server
} = require("socket.io");
const ACTIONS = require('./src/actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllconnectedclients(roomId)
{
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>
  {
    return{
      socketId,
      username:userSocketMap[socketId]
    }
  });
}
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on(ACTIONS.JOIN, ({roomId,
    username}) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllconnectedclients(roomId);
    console.log(clients)
  });
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))