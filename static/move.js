const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
}


document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 65:
      movement.left = true;
      break;
    case 87:
      movement.up = true;
      break;
    case 68:
      movement.right = true;
      break;
    case 83:
      movement.down = true;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 65:
      movement.left = false;
      break;
    case 87:
      movement.up = false;
      break;
    case 68:
      movement.right = false;
      break;
    case 83:
      movement.down = false;
      break;
  }
});


setInterval(() => {
  socket.emit('move', movement);
}, 1000 / 60);