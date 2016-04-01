var quidprofollow = require('quidprofollow')
var config = require('./config')
quidprofollow({
  twitterAPIKeys: config.twitter
}, function reportResults (err, followed, unfollowed) {
  console.log('qpf-err:', err)
  if (err) throw err
  console.log('Followed:', followed)
  console.log('Unfollowed:', unfollowed)
})