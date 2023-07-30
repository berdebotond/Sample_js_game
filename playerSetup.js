player = {
  speed: 256, // Player speed
  x: 0,
  y: 0,
  color: 'rgb(0, 0, 0)',
  isAttacking: false,
  health: 100,
  attack: 10, // Player attack
  range: 50, // Player range
  spriteSheet: new Image(),
  frameIndex: 0,
  numFrames: 4,
  timePerFrame: 100,
  timeSinceLastFrame: 0
}

player.spriteSheet.src = 'player_spritesheet.png';