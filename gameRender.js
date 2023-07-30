var render = function () {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Game state rendering
  if (gameState === "start") {
    renderStartState();
  } else if (gameState === "play") {
    renderPlayState();
  } else if (gameState === "end") {
    renderEndState();
  }
};

var renderStartState = function() {
  if (bgReady) {
    drawBackground();
  }
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Press any key to start', canvas.width / 2, canvas.height / 2);
};

var renderPlayState = function() {
  if (bgReady) {
    drawBackground();
  }
  var sprite, frameIndex, numFrames;
  if (player.isAttacking && player.attackImage) {
    sprite = player.attackImage;
    frameIndex = player.attackFrameIndex;
    numFrames = player.numAttackFrames;
  } else if (player.isMoving && player.image) {
    sprite = player.image;
    frameIndex = player.frameIndex;
    numFrames = player.numFrames;
  } else {
    sprite = player.idleImage;
    frameIndex = player.idleFrameIndex;
    numFrames = player.numIdleFrames;
  }
  var frameWidth = sprite.width / numFrames;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (player.direction === 'left') {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(sprite, frameWidth * frameIndex, 0, frameWidth, sprite.height, -72, -72, 144, 144);
  ctx.restore();


  enemies.forEach(function(enemy) {
    if (enemy.image) {
      ctx.drawImage(enemy.image, enemy.x - player.x + canvas.width / 2, enemy.y - player.y + canvas.height / 2, 124, 124); // Increased size to 64x64
    } else {
      ctx.fillStyle = 'rgb(255, 0, 0)';
      ctx.fillRect(enemy.x - player.x + canvas.width / 2, enemy.y - player.y + canvas.height / 2, 64, 64); // Increased size to 64x64
    }
  });
  

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Enemies hit: ' + hitCount, 32, 32);

  ctx.fillStyle = 'rgb(255, 0, 0)';
  ctx.fillRect(32, 64, player.health, 20);
};

var renderEndState = function() {
  if (bgReady) {
    drawBackground();
  }
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over! Press any key to restart', canvas.width / 2, canvas.height / 2);
};

var drawBackground = function() {
  var baseX = -((player.x - canvas.width / 2) % bgImage.width);
  var baseY = -((player.y - canvas.height / 2) % bgImage.height);
  if (baseX > 0) baseX -= bgImage.width;
  if (baseY > 0) baseY -= bgImage.height;
  for (var x = baseX; x < canvas.width; x += bgImage.width) {
    for (var y = baseY; y < canvas.height; y += bgImage.height) {
      ctx.drawImage(bgImage, x, y);
    }
  }
};
