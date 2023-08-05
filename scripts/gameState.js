var gameState = {
  state: 'start',
  map: 'map1',
  // ...other properties...
  EnemyRules: {
    // ...enemy rules...
  },
};

// ...


var maps = ['map1', 'map2', 'map3']; // Add more maps as needed
var selectedMapIndex = 0;
var bgReady = false;
var bgImages = {};

maps.forEach(function(map) {
  var img = new Image();
  img.onload = function () {
    bgImages[map] = img;
    if (Object.keys(bgImages).length === maps.length) {
      bgReady = true;
      console.log('All images loaded');  // Add this line
    }
  };
  img.src = 'assets/' + map + '_background.jpg';
  console.log('Loading image for ' + map);  // Add this line
});
