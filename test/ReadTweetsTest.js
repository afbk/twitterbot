let mocha = require("mocha");
let chai = require("chai");
let expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let ReadTweets = require("../src/ReadTweets.js");

describe("Reads tweets from specified account", () => {
  it("should return a string if no account is input", () => {
    expect(ReadTweets()).to.be.rejectedWith("error");
  });

  it("should return tweets from specific user account in an array", () => {
    ReadTweets("RealDonaldTrump", function(callback) {
      expect(callback).to.be.an("string");
    });
  });
});
