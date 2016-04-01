var config = require('../config')
var MovingObject = function(pos, vel, radius, color){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
}

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  var xMax = config.DIM_X;
  var yMax = config.DIM_Y;
  this.pos[0] = this.pos[0] % (xMax + this.radius);
  this.pos[1] = this.pos[1] % (yMax + this.radius);

  if (this.pos[0] < 0 - this.radius){
    this.pos[0] = xMax + this.radius;
  }

  if (this.pos[1] < 0 - this.radius){
    this.pos[1] = yMax + this.radius;
  }
}

MovingObject.prototype.draw = function(canvas){
  canvas.fillStyle = this.color;
    canvas.beginPath();

    canvas.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    canvas.fill();;
}

MovingObject.prototype.isCollidedWith = function(otherObject){
  var xdist = this.pos[0] - otherObject.pos[0]
  var ydist = this.pos[1] - otherObject.pos[1]
  var dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2))
  var radiiSum = this.radius + otherObject.radius;
  return (dist < radiiSum);
}


module.exports = MovingObject