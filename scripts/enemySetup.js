var enemies = [];
var hitCount = 0;
var waveCount = 1;


var enemyImage = new Image();
enemyImage.onload = function () {
  enemies.forEach(function(enemy) {
    enemy.image = enemyImage;
  });
};
enemyImage.src = 'assets/enemy.gif';

var goblinImage = new Image();
goblinImage.onload = function () {
  // You can assign the image to the goblin enemies when they are created
};
goblinImage.src = 'assets/goblin.png';


var generateWave = function() {
  for (var i = 0; i < waveCount; i++) {
    var enemyType = Math.random() > 0.5 ? 'normal' : 'goblin';
    var enemy = {
      type: enemyType,
      speed: enemyType === 'goblin' ? 120 : 100, // Goblin enemies are faster
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      direction: Math.random() > 0.5 ? 1 : -1,
      lastAttack: Date.now(),
      health: enemyType === 'goblin' ? 3 : Math.random() > 0.5 ? 2 : 1, // Goblin enemies have more health
      attack: enemyType === 'goblin' ? 7 : 5, // Goblin enemies have stronger attacks
      range: enemyType === 'goblin' ? 40 : 30, // Goblin enemies have a larger range
      image: enemyType === 'goblin' ? goblinImage : enemyImage, // Assign the correct image
      frameIndex: 0,
      numFrames: enemyType === 'goblin' ? 12 : 1 // Assuming the goblin image has 12 frames and the normal enemy image has 1 frame
    };
    enemies.push(enemy);
  }
  waveCount++;
};



generateWave();

