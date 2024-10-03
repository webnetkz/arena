const spawnPlayer = (context, player) => {
  const playerX = player.positionX;
  const playerY = player.positionY;
  const angle = (player.rayCast * Math.PI) / 180;

  // Рисует игрока
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 3;
  context.arc(playerX, playerY, player._playerRadius, 0, Math.PI * 2);
  context.stroke();
  context.closePath();

  context.save();

  context.translate(playerX, playerY);
  context.rotate(angle);

  // Рисуем палочку (линию) через центр круга
  context.beginPath();
  context.moveTo(0, player._playerRadius); // Верхняя точка (центр круга)
  context.lineTo(0, player._playerRadius * 3); // Нижняя точка (вниз от центра)
  context.strokeStyle = 'orange';
  context.lineWidth = 1;
  context.stroke();
  context.closePath();

  // Восстанавливаем контекст
  context.restore();

  // Рисуем имя игрока (закомментировано временно)
  // context.beginPath();
  // context.fillStyle = 'red';
  // context.font = '5px';
  // context.fillText(`${player._name}`, playerX + 5, playerY - 15);
  // context.closePath();
}
