var gameState = "start"; // Possible values: "start", "play", "end"

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = 'background.jpg';
