const players = {};

class Player {
  constructor (props) {
    this._name = props.name;
    this._id = props.id;
    this._playerRadius = 10;
    this._moveSpeed = 2;
    this._rotateSpeed = 2;

    this.positionX = 100;
    this.positionY = 100;
    this.rayCast = 180;
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

    console.log(player);

    if (movement.left && player.positionX >= 30) {
      player.positionX -= player._moveSpeed;
    }

    if (movement.up && player.positionY >= 30) {
      player.positionY -= player._moveSpeed;
    }

    if (movement.right) {
      player.positionX += player._moveSpeed;
    }

    if (movement.down) {
      player.positionY += player._moveSpeed;
    }

    if (movement.rotateLeft) {
      player.rayCast += player._rotateSpeed;
    }

    if (movement.rotateRight) {
      player.rayCast -= player._rotateSpeed;
    }
  })

  socket.on('disconnect', () => {
    delete players[socket.id];
  })

  return players;
}