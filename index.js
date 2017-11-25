let twit = require('twit');
let twitterCredentials = require('./js/twitterCredentials');
let T = new twit(twitterCredentials);

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
});

