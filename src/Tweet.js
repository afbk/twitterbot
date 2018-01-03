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
let express = require('express')

let app = express()

app.get('/', (req, res) => res.send('Twitterbot running..'))
app.listen(process.env.PORT, () => console.log('App listening on port ', process.env.PORT))


function Tweet(tweet) {
  if (!tweet) {
    return 'No input entered'
  }
  else {
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
      if (err) {
        return 'Error: ' + err.message
      }
      else {
        if (data) {
          return 'Posted: ' + data.text
        }
      }
    })
  }
}

module.exports = Tweet
