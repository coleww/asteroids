var popUser = require('./pop_user')
var makeGif = require('./make_gif')
var getAvatar = require('./get_avatar')
var replyToTweet = require('./reply_to_tweet')
var waterfall = require('async').waterfall
// async.waterfall([
//     function(callback) {
//         callback(null, 'one', 'two');
//     },
//     function(arg1, arg2, callback) {
//       // arg1 now equals 'one' and arg2 now equals 'two'
//         callback(null, 'three');
//     },
//     function(arg1, callback) {
//         // arg1 now equals 'three'
//         callback(null, 'done');
//     }
// ], function (err, result) {
//     // result now equals 'done'
// });

waterfall([getAvatar, makeGif, replyToTweet], function (err, result) {

})

// probably pop a user off the queue and run it through the pipeline?
// OH MAYBE I SHOULD LEARN HOW TO DO THAT WATERFALL MAGIC?!?!










// //
// game.step()


