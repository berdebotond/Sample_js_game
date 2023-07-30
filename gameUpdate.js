var update = function (modifier) {
  // Player movement
  if (38 in keysDown) {
    player.y -= player.speed * modifier;
  }
  if (40 in keysDown) {
    player.y += player.speed * modifier;
  }
  if (37 in keysDown) {
    player.x -= player.speed * modifier;
  }
  if (39 in keysDown) {
    player.x += player.speed * modifier;
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
    var dx = player.x - enemy.x;
    var dy = player.y - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

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
    gameState = "end";
  }
  if (enemies.length === 0) {
    generateWave();
  }
  player.timeSinceLastFrame += modifier;
  if (player.timeSinceLastFrame > player.timePerFrame) {
    player.frameIndex = (player.frameIndex + 1) % player.numFrames;
    player.timeSinceLastFrame = 0;
  }
};

