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
    if (player.image) {
      ctx.drawImage(player.image, canvas.width / 2, canvas.height / 2, 72, 72);
    } else {
      ctx.fillStyle = player.color;
      ctx.fillRect(canvas.width / 2, canvas.height / 2, 32, 32);
    }
  
    enemies.forEach(function(enemy) {
      var frameWidth = enemy.image.width / enemy.totalFrames;
      var frameHeight = enemy.image.height;
      var frameX = frameWidth * enemy.currentFrame;
      var frameY = 0;
    
      // Draw only the current frame of the sprite sheet
      ctx.drawImage(enemy.image, frameX, frameY, frameWidth, frameHeight, enemy.x, enemy.y, frameWidth, frameHeight);
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
  