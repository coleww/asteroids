(function(root){
  var asteroids = root.asteroids = (root.asteroids || {});
  var Game = asteroids.Game = function(canvas){
    this.canvas = canvas.getContext("2d");
    this.asteroids = [];
    this.bullets = [];
    this.score = 0
    this.asteroidCount = 10
    Game.DIM_X = canvas.width;
    Game.DIM_Y = canvas.height;
    this.ship = new asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], [0,0])
    this.makeAsteroids();
  }

  Game.prototype.makeAsteroids = function(){
    for (var i = this.asteroidCount; i > 0; i--){
      this.asteroids.push(asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y))
    }
  }


  var background = new Image();
  background.src = 'outerspacebackground.jpg'


  Game.prototype.draw = function(){
    var c = this.canvas
    c.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y)
    this.ship.draw(c);
    this.asteroids.forEach(function(asteroid){
      asteroid.draw(c);
    })
    this.bullets.forEach(function(bullet){
      bullet.draw(c);
    })
  }

  Game.prototype.updateScore = function(){
    this.score += 1;
    var game = this;
    $('#score').html(game.score);
  }

  Game.prototype.move = function(){
    this.ship.move();
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    })
    this.bullets.forEach(function(bullet){
      bullet.move();
    })
  }

  Game.prototype.step = function(){
    this.move();
    this.draw();
    this.checkCollisions();
    this.checkBulletHits();
    this.nextLevel();
  }

  Game.prototype.nextLevel = function(){
    if (this.asteroids.length === 0){
      this.asteroidCounts += 5;
      this.makeAsteroids();
    }
  }

  Game.prototype.start = function(){
    this.bindKeyHandlers();
    Game.TIMER = setInterval(this.step.bind(this), 30);
  }

  Game.prototype.checkCollisions = function(){
    var game = this;
    this.asteroids.forEach(function(asteroid){
      if(asteroid.isCollidedWith(game.ship)){
        game.pause();
        alert("Game Over")
      }
    })
  }

  Game.prototype.checkBulletHits = function(){
    var game = this;
    this.asteroids.forEach(function(asteroid){
      game.bullets.forEach(function(bullet){
        if(asteroid.isCollidedWith(bullet)){
          game.removeBullet(bullet);
          game.removeAsteroid(asteroid);
          game.updateScore();
        }
      })
    })
  }

  Game.prototype.removeBullet = function(bullet){
    var bulletIndex = this.bullets.indexOf(bullet);
    this.bullets.splice(bulletIndex, 1);
  }

  Game.prototype.removeAsteroid = function(asteroid){
    var asteroidIndex = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroidIndex, 1);
  }

  Game.MAX_BULLETS = 5;

  Game.prototype.fireBullet = function(){
    if (this.bullets.length = Game.MAX_BULLETS){
      this.bullets.shift();
    }
    this.bullets.push(this.ship.fireBullet())
  }

  Game.prototype.pause = function(){
    clearInterval(Game.TIMER);
  }

  Game.prototype.bindKeyHandlers = function(){
    var game = this;
    var paused = false;
    key('up', function(){
      game.ship.impulse([0, -1])
    })

    key('down', function(){
      game.ship.impulse([0, 1])
    })

    key('left', function(){
      game.ship.impulse([-1, 0])
    })

    key('right', function(){
      game.ship.impulse([1, 0])
    })

    key('space', function(){
      game.fireBullet();
    })

    key('p', function(){
      if(paused){
        game.start();
        paused = false;
      }else{
        game.pause();
        paused = true;
      }
    })
  }


})(this);