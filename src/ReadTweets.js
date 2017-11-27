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


let ReadTweets = function(user) {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(Error("error no user input"));
    }
    else {
      resolve(T.get("search/tweets", { from: user, count: 2, "tweet_mode": "extended"}, function(err, data, response) {}));
    }
  });
};



ReadTweets("RealDonaldTrump") /*.then((result) => {
  console.log(result.data.statuses[0].text);
})*/ ;
module.exports = ReadTweets;
