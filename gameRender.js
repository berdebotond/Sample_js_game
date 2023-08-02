


var render = function () {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Game state rendering
  if (gameState.state === "start") {
    renderStartState();
  } else if (gameState.state === "play") {
    renderPlayState();
  } else if (gameState.state === "end") {
    renderEndState();
  }
};

var renderStartState = function() {
  console.log('Rendering start state' + maps[selectedMapIndex] + ' map' + selectedMapIndex + "+" +  bgReady); 
  if (bgReady) {
    console.log('Drawing background for ' + maps[selectedMapIndex]);
    drawBackground();
  }
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.font = '50px Helvetica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('My Awesome Game', canvas.width / 2, canvas.height / 2 - 100);

  ctx.font = '24px Helvetica';
  ctx.fillText('Use arrow keys to move', canvas.width / 2, canvas.height / 2 - 50);
  ctx.fillText('Press space to attack', canvas.width / 2, canvas.height / 2 - 20);

  // Make the "Press Enter to start" text blink
  if (Math.floor(Date.now() / 500) % 2) {
    ctx.fillText('Press Enter to start', canvas.width / 2, canvas.height / 2 + 20);
  }

  ctx.fillText('Use arrow keys to select map', canvas.width / 2, canvas.height / 2 + 50);
  ctx.fillText('Current map: ' + maps[selectedMapIndex], canvas.width / 2, canvas.height / 2 + 80);
};

addEventListener('keydown', function (e) {
  if (gameState === "start" && e.keyCode === 13) { // 13 is the key code for Enter
    gameState = "play";
  } else if (gameState === "end" && e.keyCode === 13) {
    gameState = "start";
    // Reset game to initial state...
  } else {
    keysDown[e.keyCode] = true;
  }
}, false);


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
      var frameWidth = enemy.image.width / enemy.numFrames;
      ctx.drawImage(enemy.image, frameWidth * enemy.frameIndex, 0, frameWidth, enemy.image.height, enemy.x - player.x + canvas.width / 2, enemy.y - player.y + canvas.height / 2, 134, 132);
      enemy.frameIndex = (enemy.frameIndex + 1) % enemy.numFrames;
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
    console.log('gameState.map before drawing:', gameState.map); // Debugging line
    drawBackground();
  }
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over! Press any key to restart', canvas.width / 2, canvas.height / 2);
};

var drawBackground = function() {
  var bgImage = bgImages[gameState.map]; // Get the correct background image for the current map
  if (!bgImage) {
    console.error('Background image not found for map:', gameState.map);
    return;
  }

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
