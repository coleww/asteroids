var MovingObject = require('./moving_object')

Function.prototype.inherits = function(superClass){
  function Surrogate(){};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
}

var asteroidImage = new Image();
asteroidImage.src = 'asteroid.png'

var Asteroid = function(pos, vel){
  MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
}
Asteroid.inherits(MovingObject);
Asteroid.RADIUS = 20;
Asteroid.COLOR = "brown"

Asteroid.randomAsteroid = function(dimX, dimY){
  var position = [Math.random() * dimX, Math.random() * dimY]
  return new Asteroid(position, randomVec());
}

function randomVec(){
  return [((Math.random() * 4) - 2), ((Math.random() * 4) - 2)]
};

Asteroid.prototype.draw = function(canvas){
   canvas.drawImage(asteroidImage,
     this.pos[0] - this.radius,
     this.pos[1] - this.radius,
     this.radius * 2,
     this.radius * 2
   );
}

module.exports = Asteroid
