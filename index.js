var redis = require('redis')
var client = redis.createClient()
var fs = require('fs')
var request = require('request')
var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user', {stringify_friend_ids: true})
var friends = {}

function tweetIsAMentionFromAFollower (t) {
  var isNotATweetFromTheBot = t.user.screen_name !== config.BOT_NAME
  var theBotIsFriendsWithTheTweeter = friends[t.user.id_str]
  var theTweetMentionsOneUser = t.entities && t.entities.user_mentions && t.entities.user_mentions.length = 1
  var thatOneUserIsTheBot = t.entities.user_mentions[0].screen_name == config.BOT_NAME
  return isNotATweetFromTheBot && theBotIsFriendsWithTheTweeter && theBotIsMentionedInTheTweet && thatOneUserIsTheBot
}

stream.on('tweet', function (t) {
  if (tweetIsAMentionFromAFollower(t)) client.rpush('asteroids', JSON.stringify(t.user), redis.print)
})

stream.on('event', function (m) {
  if (m.friends_str) {
    m.friends_str.forEach(function (id) {
      friends[id] = true
    })
  } else if (m.event) {
    switch (m.event) {
      case 'follow':
        var user = m.source
        if (user.screen_name !== config.BOT_NAME) {
          friends[user.id_str] = true
        }
        break;
    }
  } else {
    console.log('um idk lol', m)
  }
})