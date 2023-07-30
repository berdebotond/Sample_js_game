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
  numFrames: 8, // Number of frames in the sprite sheet
  timePerFrame: 1 / 8, // Time per frame for 16 fps animation
  timeSinceLastFrame: 0, // Time since the last frame was displayed
  attackFrameIndex: 0, // Current frame index for attack animation
  numAttackFrames: 22, // Number of frames in the attack sprite sheet
  isAttacking: false, // Whether the player is attacking
  isMoving: false, // Whether the player is moving
  idleFrameIndex: 0, // Current frame index for idle animation
  numIdleFrames: 15, // Number of frames in the idle sprite sheet
  direction: 'right', // The direction the player is facing

};

var playerImage = new Image();
playerImage.onload = function () {
  player.image = playerImage;
};
playerImage.src = 'noBKG_KnightRun_strip.png'; // Use sprite sheet instead of single image

var attackImage = new Image();
attackImage.onload = function () {
  player.attackImage = attackImage;
};
attackImage.src = 'noBKG_KnightAttack_strip.png';

var idleImage = new Image();
idleImage.onload = function () {
  player.idleImage = idleImage;
};
idleImage.src = 'noBKG_KnightIdle_strip.png'; // Use idle sprite sheet for idle animation
