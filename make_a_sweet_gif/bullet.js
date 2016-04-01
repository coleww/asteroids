var MovingObject = require('./moving_object')
var Bullet  = function(pos, vel){
  this.startPos = pos;
  MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
};
Bullet.inherits(asteroids.MovingObject);
Bullet.RADIUS = 1;
Bullet.COLOR = "red";

module.exports = Bullet