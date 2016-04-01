var redis = require('redis')
var client = redis.createClient()
var config = require('./config')
var twitConfig = config.TWITTER
var replyInterval = config.REPLY_INTERVAL
var Twit = require('twit')
var T = new Twit(twitConfig)

client.lpop('asteroids', function (err, tweetString) {
  console.log('popping', tweetString)
  if (err) {
    console.log(err)
    client.end()
  } else if (tweetString !== null) {
    var user = JSON.parse(tweetString)
    // if not null, check if we've already tweeted at this user recently
    client.exists('&' + user.screen_name, function (err, exists) {
      console.log(t.id_str, 'we have replied to this user recently', exists)
      var timestamp = new Date().getTime()
      // if we haven't already tweeted, tweet and save a timestamp
      if (err) {
        console.log(err)
        client.end()
      } else {
        client.get('&' + user.screen_name, function (err, lastTweeted) {
          if (err) {
            console.log(err)
            client.end()
          } else {
            if (!exists || (timestamp - parseInt(lastTweeted, 10) > replyInterval)) {


                        // ON SUCCESS: DO THIS
                        // client.set('&' + user, timestamp + '', function () {
                        //   client.end()
                        // })
        // ALWAYS client.end() ALWAYS ALWAYS ALWAYS
        // todo: wrap this whole thing in a huge try catch(){client.end()}
        // hm maybe return the client to the waterfall chain, that way the end thing can do it?
            }
          }
        })
      }
    })
  } else {
    // OH, OF COURSE!
    client.end()
  }
})
