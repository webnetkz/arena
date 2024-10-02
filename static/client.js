const socket = io();

const reloadUsers = (data) => {
  data.forEach(player => {
    const hello = document.createElement('div');
    hello.innerText = `id: ${player.id}, count: ${player.count}`;
    document.body.appendChild(hello);
  });
}

socket.emit('new_player');

socket.on('state', (data) => {
  reloadUsers(data)
});

socket.on('new', (data) => {
  console.log(data);
  socket.emit('hello', `id ${data}`);
});