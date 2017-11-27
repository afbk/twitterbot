let mocha = require("mocha");
let chai = require("chai");
let expect = chai.expect;
let CreateArrayOfWords = require("../src/CreateArrayOfWords.js");

describe("Creates an array of all words recieved from ReadTweets", () => {
    it("should return a string", () => {
        return expect(Promise.resolve("CreateConcatenatedStringOfWords")).to.eventually.be.a("string");
    });
    it("should then return an array", () => {
       return expect(Promise.resolve("CreateArrayFromString")).to.eventually.be.an("array");
    });
});