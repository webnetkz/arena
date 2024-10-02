const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

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

const players = [];
let count = 1;

io.on('connection', (socket) => {
  socket.emit('new', socket.id);

  socket.on('new_player', (data) => {
    players.push({
      id: socket.id,
      count: count,
    });

    count++;
    socket.emit('state', players);
  });

  socket.on('hello', (data) => {
    console.log('Message received: ', data);
  });

  socket.on('disconnect', () => {
    players.pop();
    socket.emit('state', players);
    count--;
  });
});