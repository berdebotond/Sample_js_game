var player = {
  speed: 256, // Player speed
  x: 0,
  y: 0,
  color: 'rgb(0, 0, 0)',
  isAttacking: false,
  health: 100,
  attack: 10, // Player attack
  range: 50, // Player range
  frameIndex: 0, // Current frame index for sprite animation
  numFrames: 16, // Number of frames in the sprite sheet
  timePerFrame: 1 / 16, // Time per frame for 16 fps animation
  timeSinceLastFrame: 0, // Time since the last frame was displayed
  attackFrameIndex: 0, // Current frame index for attack animation
  numAttackFrames: 30, // Number of frames in the attack sprite sheet
  isAttacking: false, // Whether the player is attacking
};

var playerImage = new Image();
playerImage.onload = function () {
  player.image = playerImage;
};
playerImage.src = 'spr_Idle_strip.png'; // Use sprite sheet instead of single image

var attackImage = new Image();
attackImage.onload = function () {
  player.attackImage = attackImage;
};
attackImage.src = 'spr_Attack_strip.png';