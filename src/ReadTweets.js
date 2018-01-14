const twit = require('twit')
const twitterCredentials = require('./twitterCredentials')
const T = new twit(twitterCredentials)
const _ = require('lodash')
const tweetIt = require('./TweetIt')
const express = require('express')
const app = express()

//sets up a webserver in order to show running status
app.get('/', (req, res) => {
  res.send(`Twitter bot running on port ${process.env.PORT}`)
})
app.listen(process.env.PORT, () => {
  console.log('Twitter bot listening on port ', process.env.PORT)
})

//Read tweets from a given username
const readTweets = function(userName) {
  return new Promise((resolve, reject) => {
    if (!userName) reject(Error('Error: no user input in ReadTweets'))
    else {
      resolve(
        T.get('search/tweets', { from: userName, count: 100, tweet_mode: 'extended' },
          function(err, data, response) {
            if (err) console.log("Error reading tweet: ", err)
          }
        )
      )
    }
  })
}

//concats an array of tweets in to a string
function concatTweets(inputArray) {
  return inputArray.data.statuses.map(x => x.full_text).join(' ')

}

//removes urls from string of tweets
function removeHTTP(inputString) {
  const HTTPregex = /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  return inputString.replace(HTTPregex, '')
}

//splits string up in to an array based on regex
function splitSentences(inputString) {
  return inputString.split(/\. |[\!\,] ?/g)
}

//removes blank entries in the array
function removeBlankEntries(inputArray) {
  return inputArray.filter((x) => {
    if (
      x == "" ||
      x == " " ||
      x == "  " ||
      x == "   ") { return false }
    else { return true }
  })
}

//removes entries in the array that consists of just numbers
function removeNumbers(inputArray) {
  return inputArray.filter((x) => {
    return /\D/.test(x)

  })
}

//replaces &amp; with &
function replaceAmpersands(inputArray) {
  return inputArray.map(x => x.replace(/&amp;/g, "&"))
}

//trims whitespace from start/end of entries in the array
function trimWhitespace(inputArray) {
  return inputArray.map(x => x.trim())
}

//randomises the arr
function shuffleArray(inputArray) {
  return _.shuffle(inputArray)
}

//composes the tweet up to a max given length
function composeTweet(inputArray) {
  return inputArray.reduce((acc, x) => {
    if (acc.length + x.length < 270) {
      acc += ' ' + x
    }
    return acc
  })
}

//makes the tweet go tweet every x miliseconds
const makeTweet = _.flow([
  concatTweets,
  removeHTTP,
  splitSentences,
  removeBlankEntries,
  removeNumbers,
  replaceAmpersands,
  trimWhitespace,
  shuffleArray,
  composeTweet
])

setInterval(() => {
  readTweets('RealDonaldTrump')
    .then(makeTweet)
    .then(x => tweetIt(x))
    .then(x => console.log(`Tweeting: ${x.data.text}`))
}, 10800000)

//export all functions for testing
module.exports = {
  makeTweet,
  concatTweets,
  removeHTTP,
  splitSentences,
  removeBlankEntries,
  removeNumbers,
  replaceAmpersands,
  trimWhitespace,
  shuffleArray,
  composeTweet
}
