const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  rotateLeft: false,
  rotateRight: false,
}


document.addEventListener('keydown', (event) => {
  console.log(event.keyCode);
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
    case 37:
      movement.rotateLeft = true;
      break;
    case 39:
      movement.rotateRight = true;
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
    case 37:
      movement.rotateLeft = false;
      break;
    case 39:
      movement.rotateRight = false;
      break;
  }
});


setInterval(() => {
  socket.emit('move', movement);
}, 1000 / 60);