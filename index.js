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
  // we only want to reply to tweets from followers that mention only the bot and no one else
  var isNotATweetFromTheBot = t.user.screen_name !== config.BOT_NAME
  var theBotIsFriendsWithTheTweeter = friends[t.user.id_str]
  var theTweetMentionsOneUser = t.entities && t.entities.user_mentions && t.entities.user_mentions.length = 1
  var thatOneUserIsTheBot = t.entities.user_mentions[0].screen_name == config.BOT_NAME
  return isNotATweetFromTheBot && theBotIsFriendsWithTheTweeter && theBotIsMentionedInTheTweet && thatOneUserIsTheBot
}

stream.on('tweet', function (t) {
  if (tweetIsAMentionFromAFollower(t)) client.rpush('asteroids', JSON.stringify(t.user), redis.print)
})

stream.on('friends', function (friendsList) {
  // when u connect to a user stream, it returns yr friends AKA who u follow.
  friendsList.forEach(function (id) {
    friends[id] = true
  })
})

stream.on('message', function (m) {
  // if a user follows the bot, and they are a new follower, follow them back
  // this is async but should be fine whatever it's fine cool ok
  if (m.event == 'follow' && m.source.screen_name !== config.BOT_NAME && !friends[m.source.id_str]) {
    friends[user.id_str] = true
    T.post('friendships/create', {user_id: m.source.id_str}, function (e, d, r){
      if (e) {
        console.log(e)
      } else {
        console.log('followed', m.source.screen_name)
      }
    })
  }
})