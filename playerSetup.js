var player = {
    speed: 256, // Player speed
    x: 0,
    y: 0,
    color: 'rgb(0, 0, 0)',
    isAttacking: false,
    health: 100,
    attack: 10, // Player attack
    range: 50 // Player range
  };
  
  var playerImage = new Image();
  playerImage.onload = function () {
    player.image = playerImage;
  };
  playerImage.src = 'player.png'; 
  