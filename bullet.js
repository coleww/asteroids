(function(root){
  var asteroids = root.asteroids = (root.asteroids || {});


  var Bullet = asteroids.Bullet = function(pos, vel){
    this.startPos = pos;
    asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };
  Bullet.inherits(asteroids.MovingObject);
  Bullet.RADIUS = 1;
  Bullet.COLOR = "red";

  // Bullet.prototype.move = function(){
  //
  // }


})(this);