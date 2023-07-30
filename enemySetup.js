var enemies = [];
var hitCount = 0;
var waveCount = 1;


var enemyImage = new Image();
enemyImage.onload = function () {
  enemies.forEach(function(enemy) {
    enemy.image = enemyImage;
  });
};
enemyImage.src = 'enemy.gif';


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
      image: enemyImage // Assign the image to each enemy as it's created
    };
    enemies.push(enemy);
  }
  waveCount++;
};

generateWave();
