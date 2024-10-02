const socket = io();

const WIDHT = 500;
const HEIGHT = 500;

const canvas = document.getElementById('arena');
      canvas.width = WIDHT;
      canvas.height = HEIGHT;
const context = canvas.getContext('2d');

socket.emit('new_player');

socket.on('state', (players) => {
  context.beginPath();
  context.fillStyle = 'gray';
  context.fillRect(0, 0, WIDHT, HEIGHT);
  context.closePath();

  for (const id in players) {
    const player = players[id];
    spawnPlayer(context, player);
  }
});

socket.on('new', (data) => {
  console.log(data);
  socket.emit('hello', `id ${data}`);
});