var redis = require('redis')
var client = redis.createClient()
var fs = require('fs')
var request = require('request')
var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user')


function tweetIsAMentionFromAFollower (t) {
  t.entities.user_mentions.some(function (u) {
    return u.screen_name = config.botName
  })
}

stream.on('tweet', function (t) {
  if (tweetIsAMentionFromAFollower(t)) client.rpush('asteroids', JSON.stringify(t.user), redis.print)
})