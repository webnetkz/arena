const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const getPlayers = require("./player").getPlayers;


const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.set("port", 5000);

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "static", "index.html"));
});


server.listen(5000, () => {
  console.log('Start server Arena on port 5000');
});

// *********************
// Game
// *********************


let players = [];
let count = 1;

io.on('connection', (socket) => {
  socket.emit('new', socket.id);

  players = getPlayers(socket);

  socket.on('new_player', (data) => {

    count++;
    socket.emit('state', players);
  });

  socket.on('hello', (data) => {
    console.log('Message received: ', data);
  });

  socket.on('disconnect', () => {
    socket.emit('state', players);
    count--;
  });
});

const gameLoop = (players, io) => {
  io.sockets.emit('state', players);
};

setInterval(() => {
  if (players && io) {
    gameLoop(players, io);
  }
}, 1000 / 60)