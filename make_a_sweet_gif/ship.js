var MovingObject = require('./moving_object')
var Bullet = require('./bullet')
var Image = require('canvas').Image
var Ship = function(pos,vel){
  this.maxSpeed = 3;
  MovingObject.call(this, pos,vel, Ship.RADIUS, Ship.COLOR)
}
Ship.RADIUS = 17
Ship.COLOR = "blue"
Ship.inherits(asteroids.MovingObject);
var shipImage = new Image();
shipImage.src = 'ship.png'

Ship.prototype.impulse = function(power){
  this.vel[0] += power[0];
  if (Math.abs(this.vel[0]) > this.maxSpeed){
    this.vel[0] *= 0.75;
  }
  this.vel[1] += power[1]
  if (Math.abs(this.vel[1]) > this.maxSpeed){
    this.vel[1] *= 0.75;
  }
}

Ship.prototype.fireBullet = function(){
  if (this.vel === [0, 0]){
    return null;
  }
  var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))
  var direction = [this.vel[0] / speed, this.vel[1] / speed]
  var bulletVelocity = [direction[0] * 10, direction[1] * 10]
  return new Bullet([this.pos[0], this.pos[1]], bulletVelocity);
}

Ship.prototype.draw = function(canvas){
   canvas.drawImage(shipImage,
     this.pos[0] - this.radius,
     this.pos[1] - this.radius,
     this.radius * 2,
     this.radius * 2
   );
}

