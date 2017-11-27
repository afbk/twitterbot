let mocha = require("mocha");
let chai = require("chai");
let expect = chai.expect;
let Tweet = require("../src/Tweet.js");

describe("Tweet.js test", () => {
  describe("Tweet function", () => {
    it("should return a string", () => {
      expect(Tweet()).to.be.a("string");
    });
  });
});
