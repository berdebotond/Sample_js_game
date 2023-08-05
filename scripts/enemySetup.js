let goblinImage = new Image();
goblinImage.onload = function () {
  };
goblinImage.src = 'assets/goblin.png';

let goblin = new Enemy({
  name: 'goblin',
  speed: 120,
  health: 3,
  damage: 7,
  frameIndex: 0,
  numFrames: 8,
  image: goblinImage,
  range: 40,
  isAttacking: false,
  image_path: 'assets/goblin.png'
});


let normalEnemyImage = new Image();
normalEnemyImage.onload = function () {
  enemies.forEach(function(enemy) {
    enemy.image = normalEnemyImage;
  });
};
normalEnemyImage.src = 'assets/enemy.gif';

let normalEnemy = new Enemy({
  name: 'normal',
  speed: 120,
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  health: 3,
  damage: 7,
  frameIndex: 0,
  numFrames: 8,
  image: normalEnemyImage,
  range: 40,
  hitCount: 0,
  isAttacking: false,
  image_path: 'assets/enemy.gif'
});

let enemies = [];
let hitCount = 0;
let waveCount = 1;

// Generate a new wave every 5000 milliseconds (5 seconds)
let generateWaveInterval = 60*100; // Adjust this value to change the wave generation interval

let generateWave = function() {
  let spawnRadius = 300; // Adjust this value to change the spawn radius around the player
  for (let i = 0; i < waveCount; i++) {
    let enemyType = Math.random() > 0.5 ? 'normal' : 'goblin';
    let enemyTemplate = enemyType === 'normal' ? normalEnemy : goblin;
    let spawnAngle = Math.random() * 2 * Math.PI; // Random angle for enemy spawn
    let enemy = Object.assign({}, enemyTemplate, {
      x: player.x + spawnRadius * Math.cos(spawnAngle), // Spawn enemy within the spawn radius around the player
      y: player.y + spawnRadius * Math.sin(spawnAngle), // Spawn enemy within the spawn radius around the player
      direction: Math.random() > 0.5 ? 1 : -1,
      lastAttack: Date.now()
    });
    enemies.push(enemy);
  }
  waveCount++;
};

setInterval(generateWave, generateWaveInterval);