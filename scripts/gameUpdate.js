var update = function (modifier) {
  // Player movement
  if (38 in keysDown && !player.isAttacking) { // Up arrow key
    player.y -= player.speed * modifier;
    player.isMoving = true;
  } else if (40 in keysDown && !player.isAttacking) { // Down arrow key
    player.y += player.speed * modifier;
    player.isMoving = true;
  } else if (37 in keysDown && !player.isAttacking) { // Left arrow key
    if (gameState.state == 'play') {
      player.x -= player.speed * modifier;
      player.isMoving = true;
      player.direction = 'left'; 
    }
  } else if (39 in keysDown && !player.isAttacking) { // Right arrow key
    if (gameState.state == 'play') {

      player.x += player.speed * modifier;
      player.isMoving = true;
      player.direction = 'right';
    }
  } else {
    player.isMoving = false;
  }

  // Player attack
  if (32 in keysDown) {
    player.color = 'rgb(255, 0, 0)';
    player.isAttacking = true;
  } else {
    player.color = 'rgb(0, 0, 0)';
    player.isAttacking = false;
  }
  

  // Enemy interaction
  enemies.forEach(function(enemy, i) {
    var dx = player.x - (enemy.x + 16); // Adjust for the increased enemy size
    var dy = player.y - (enemy.y + 16); // Adjust for the increased enemy size
    var distance = Math.sqrt(dx * dx + dy * dy);
  
    // Rest of the code...
    // Player attack on enemy
    if (distance < player.range && player.isAttacking) {
      enemy.health -= player.attack;
      if (enemy.health <= 0) {
        enemies.splice(i, 1);
        hitCount++;
      }
    }

    // Enemy attack on player
    if (distance < enemy.range && !player.isAttacking && Date.now() - enemy.lastAttack > 3000) {
      player.health -= enemy.attack;
      enemy.lastAttack = Date.now();
    }

    // Enemy movement
    var angle = Math.atan2(dy, dx);
    enemy.x += Math.cos(angle) * enemy.speed * modifier;
    enemy.y += Math.sin(angle) * enemy.speed * modifier;
  });

  // Game state updates
  if (player.health <= 0) {
    gameState.state = "end";
  }
  if (enemies.length === 0) {
    generateWave();
  }
  if (player.health <= 0) {
    gameState.state = "end";
  }
  if (enemies.length === 0) {
    generateWave();
  }
  if (player.isAttacking) {
    player.timeSinceLastFrame += modifier;
    if (player.timeSinceLastFrame > player.timePerFrame) {
      player.attackFrameIndex = (player.attackFrameIndex + 1) % player.numAttackFrames;
      player.timeSinceLastFrame = 0;
    }
  } else if (player.isMoving) {
    player.timeSinceLastFrame += modifier;
    if (player.timeSinceLastFrame > player.timePerFrame) {
      player.frameIndex = (player.frameIndex + 1) % player.numFrames;
      player.timeSinceLastFrame = 0;
    }
  } else {
    player.timeSinceLastFrame += modifier;
    if (player.timeSinceLastFrame > player.timePerFrame) {
      player.idleFrameIndex = (player.idleFrameIndex + 1) % player.numIdleFrames;
      player.timeSinceLastFrame = 0;
    }
  }
};

