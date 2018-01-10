let twit = require('twit')
let twitterCredentials = require('./twitterCredentials')
let T = new twit(twitterCredentials)

function tweetIt(tweet) {
  if (!tweet) {
    return 'No tweet input into TweetIt()'
  }
  else {
    return new Promise((resolve, reject) => {
      resolve(
        T.post('statuses/update', { status: tweet }, function(err, data, response) {
          if (err) {
            return 'Error tweeting: ' + err.message
          }
          else {
            if (data) {
              return 'Posted tweet: ' + data.text
            }
          }
        }))
    })
  }
}

module.exports = tweetIt
