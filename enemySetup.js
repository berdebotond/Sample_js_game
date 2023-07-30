var enemies = [];
var hitCount = 0;
var waveCount = 1;



var enemyImage = new Image();

enemyImage.src = 'enemy_spritesheet.png';
enemyImage.onload = function () {
  // This will add the image to each enemy object when it's loaded
  enemies.forEach(function(enemy) {
    enemy.image = enemyImage;
  });
};
var generateWave = function() {
  for (var i = 0; i < waveCount; i++) {
    var enemy = {
      speed: 100, // Enemy speed
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      direction: Math.random() > 0.5 ? 1 : -1,
      lastAttack: Date.now(),
      health: Math.random() > 0.5 ? 2 : 1,
      attack: 5, // Enemy attack
      range: 30, // Enemy range
      image: enemyImage, // Assign the enemy image here
      currentFrame: 0,
      totalFrames: 8, 
    };
    enemies.push(enemy);
  }
  waveCount++;
};

generateWave();
