var keysDown = {};

addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);

addEventListener('keydown', function (e) {
  if (e.keyCode === 27) { // 27 is the key code for Escape
    gameState.state = 'start';
    selectedMapIndex = 0; // Reset to the first map or any other starting values
    gameState.map = maps[selectedMapIndex];
    console.log('Game reset to main menu'); // Debugging line
  } else if (gameState.state === 'start') {
    if (e.keyCode === 13) { // Enter key
      gameState.state = 'play';
      gameState.map = maps[selectedMapIndex];
      console.log('Starting game with ' + gameState.map);
    } else if (e.keyCode === 37) { // Left arrow key
      selectedMapIndex = (selectedMapIndex - 1 + maps.length) % maps.length;
    } else if (e.keyCode === 39) { // Right arrow key
      selectedMapIndex = (selectedMapIndex + 1) % maps.length;
    }
  } else if (gameState.state === 'end' && e.keyCode === 13) {
    gameState.state = 'start';
    // Reset game to initial state...
  } else {
    keysDown[e.keyCode] = true;
  }
}, false);

