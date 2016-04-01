var config = require('../config')
var Canvas = require('canvas')
var Image = Canvas.Image
var canvas = new Canvas(config.DIM_X, config.DIM_Y)
var ctx = canvas.getContext('2d')


var MakeGame = require('./game')
var Game = new MakeGame(canvas)

var GIFEncoder = require('gifencoder')
var fs = require('fs')





var encoder = new GIFEncoder(config.DIM_X, config.DIM_Y);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('./current.gif'));

encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(500);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.



encoder.addFrame(ctx);

encoder.finish();

  // on errror: return cb(error, user)
  // on success: cb(null, user)