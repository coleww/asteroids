var redis = require('redis')
var client = redis.createClient()
var fs = require('fs')
var request = require('request')
var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user')

stream.on('tweet', function (t) {
  console.log('processing', t.user.screen_name, t.text)
  client.rpush('asteroids', JSON.stringify(t.user), redis.print)
})