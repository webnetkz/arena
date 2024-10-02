const spawnPlayer = (context, player) => {
  const playerX = player.positionX;
  const playerY = player.positionY;

  context.beginPath();
  context.fillStyle = 'red';
  context.font = '10px';
  context.fillText(`Player ${player._name}`, playerX - 35, playerY - 50);
  context.closePath();

  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 3;
  context.arc(playerX, playerY, player._playerRadius, 0, Math.PI * 2);
  context.stroke();
  context.closePath();
}