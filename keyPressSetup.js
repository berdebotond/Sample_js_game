var keysDown = {};

addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);

addEventListener('keydown', function (e) {
  if (gameState === "start") {
    gameState = "play";
  } else if (gameState === "end") {
    gameState = "start";
    // Reset game to initial state...
  } else {
    keysDown[e.keyCode] = true;
  }
}, false);
