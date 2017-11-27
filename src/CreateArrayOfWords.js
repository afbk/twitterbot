let ReadTweets = require("./ReadTweets.js");

let concatTweetsFromUser = "";


//Concatenates the strings from all the tweets in order to split them into an array later
function CreateConcatenatedStringOfWords() {
    return new Promise((resolve, reject) => {
        ReadTweets("RealDonaldTrump").then((result) => {
            for (var i = 0; i < result.data.statuses.length; i++) {
                concatTweetsFromUser += result.data.statuses[i].full_text;
            }
            resolve(concatTweetsFromUser);
        });
    });
};

//Splits the concatenated string into an array in order to do markov-like things with it later
function CreateArrayFromString() {
    return new Promise((resolve, reject) => {
        CreateConcatenatedStringOfWords().then((result) => {
            let splitWords = result.split(" ");
            resolve(splitWords);
        });
        
    });
};

CreateArrayFromString().then((data) => {
    console.log(data);
});

module.exports = CreateArrayFromString();
