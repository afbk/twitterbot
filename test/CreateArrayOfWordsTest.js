let mocha = require("mocha");
let chai = require("chai");
let expect = chai.expect;
let CreateConcatenatedStringOfWords = require("../src/CreateArrayOfWords.js").CreateConcatenatedStringOfWords;
let CreateArrayFromString = require("../src/CreateArrayOfWords.js").CreateArrayFromString;


describe("Creates an array of all words recieved from ReadTweets", () => {
    it("promise should be fulfulled", () => {
       return expect(Promise.resolve(CreateArrayFromString)).to.eventually.be.fulfilled;
    });
    it("should return a string", () => {
        return expect(Promise.resolve(CreateConcatenatedStringOfWords)).to.eventually.be.a("string");
    });
    it("should then return an array", () => {
       return expect(Promise.resolve(CreateArrayFromString)).to.eventually.be.a("array");
    });
});