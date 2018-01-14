const tweetIt = require('./TweetIt.js')


describe('tweetIt() function', () => {

    it('should tell us when no user was input', () => {
        expect(tweetIt()).toBe('No tweet input into TweetIt()')
    })
})
