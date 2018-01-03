let twit = require('twit')
/*The required file below contains the credentials for logging in to twitter.
It follows this format:
let twitterCredentials = ({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
});
module.exports = (twitterCredentials);
*/
let twitterCredentials = require('./twitterCredentials')
let T = new twit(twitterCredentials)
let _ = require('lodash')
let Tweet = require('./Tweet')

let ReadTweets = function(user) {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(Error('error no user input'))
    }
    else {
      resolve(
        T.get(
          'search/tweets', { from: user, count: 100, tweet_mode: 'extended' },
          function(err, data, response) {}
        )
      )
    }
  })
}

let concatTweetsFromUser = ''

//Concatenates the strings from all the tweets in order to split them into an array later
function CreateConcatenatedStringOfWords(username) {
  return new Promise((resolve, reject) => {
    ReadTweets(username).then(result => {
      for (var i = 0; i < result.data.statuses.length; i++) {
        concatTweetsFromUser += ' ' + result.data.statuses[i].full_text
      }
      resolve(concatTweetsFromUser)
    })
  })
}

//Splits the concatenated string into an array in order to do things with it later
function CreateArrayFromString(username) {
  return new Promise((resolve, reject) => {
    CreateConcatenatedStringOfWords(username).then(result => {
      let HTTPregex =
        '/https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g'
      let removeHTTP = result.replace(HTTPregex, '')
      let splitWords = removeHTTP.split(/[\.\!\,] ?/g)

      function RemoveBlankEntries(input) {
        for (var i = 0; i < input.length; i++) {
          if (input[i].toString() == '') {
            input.splice(i, 2)
          }
        }
        return input
      }
      resolve(RemoveBlankEntries(splitWords))
    })
  })
}

// Construct the tweet
function ComposeTweet(input) {
  let tweet = ''

  function PopulateTweet(input) {
    for (var i = 0; i < input.length; i++) {
      let randomEntry = _.sample(input)
      if (randomEntry.toString.length + tweet.length < 180) {
        tweet += randomEntry + ' '
      }
    }
  }

  PopulateTweet(input)
  return tweet
}

//Submit the tweet
function goGoGo() {
  CreateArrayFromString('RealDonaldTrump').then(data => {
    Tweet(ComposeTweet(data))
  })
}

//runs once then waits for one hour between tweets
goGoGo()
setInterval(() => {
  goGoGo()
}, 3600000)
