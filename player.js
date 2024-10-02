const players = {};

class Player {
  constructor (props) {
    this._name = props.name;
    this._id = props.id;
    this._playerRadius = 30;

    this.positionX = 100;
    this.positionY = 100;
  }
}

module.exports.getPlayers = (socket) => {
  socket.on('new_player', () => {
    players[socket.id] = new Player({
      id: socket.id,
      name: Object.keys(players).length,
    });
  });

  socket.on('move', (movement) => {
    const player = players[socket.id] || {};
    
    if (movement.left) {
      player.positionX -= 5;
    }

    if (movement.up) {
      player.positionY -= 5;
    }

    if (movement.right) {
      player.positionX += 5;
    }

    if (movement.down) {
      player.positionY += 5;
    }
  })

  socket.on('disconnect', () => {
    delete players[socket.id];
  })

  return players;
}