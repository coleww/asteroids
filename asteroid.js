(function(root){
  var asteroids = root.asteroids = (root.asteroids || {});

  Function.prototype.inherits = function(superClass){
    function Surrogate(){};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var asteroidImage = new Image();
  asteroidImage.src = 'asteroid.png'

  var Asteroid = asteroids.Asteroid = function(pos, vel){
    asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  }
  Asteroid.inherits(asteroids.MovingObject);
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


})(this);