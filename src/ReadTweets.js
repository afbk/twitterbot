let twit = require("twit");
/*This file below contains the credentials for logging in to twitter.
It follows this format:
let twitterCredentials = ({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
});
module.exports = (twitterCredentials);
*/
let twitterCredentials = require("./twitterCredentials");
let T = new twit(twitterCredentials);

function ReadTweets(user) {
  if (!user) {
    return "No user input";
  } else {
  }
}

module.exports = ReadTweets;