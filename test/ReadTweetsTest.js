let mocha = require("mocha");
let chai = require("chai");
let expect = chai.expect;
let ReadTweets = require("../src/ReadTweets.js");

describe("Reads tweets from specified account", () => {
  it("should return a string if no account is input", () => {
    expect(ReadTweets()).to.be.a("string");
  });
});
