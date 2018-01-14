/*global expect*/
const readTweets = require('./ReadTweets')

describe('Read tweets and manipulates them', () => {

  describe('readTweets()', () => {
    it('should read tweets')
    it('should pass on JSON')
  })

  describe('concatTweets()', () => {
    it('should concat all tweets in the array to one string', () => {
      const result = readTweets.concatTweets({
        data: {
          statuses: [{ full_text: 'tweet1' }, { full_text: 'tweet2' }]
        }
      })
      expect(result).toBe('tweet1 tweet2')
    })
  })

  describe('removeHTTP()', () => {
    it('should remove URLs from the string', () => {
      const result = readTweets.removeHTTP('asd https://t.co/123 lars lars http://tweet.com/hej')
      expect(result).toBe('asd  lars lars ')
    })
  })

  describe('splitSentences()', () => {
    it('should split the string into an array', () => {
      const result = readTweets.splitSentences('hej. lars! text, text2')
      expect(result).toEqual(["hej", "lars", "text", "text2"])
    })
  })

  describe('removeBlankEntries', () => {
    it('should remove blank entries from the array.', () => {
      const result = readTweets.removeBlankEntries(
        ["hej", "lars", "text", "text2", "", " ", "  ", "   "])
      expect(result).toEqual(["hej", "lars", "text", "text2"])
    })
  })

  describe('removeNumbers', () => {
    it('should remove any entries in the array that consist of only numbers', () => {
      const result = readTweets.removeNumbers(['123', 'hello 789', 'world', '456'])
      expect(result).toEqual(["hello 789", "world"])
    })
  })

  describe('replaceAmpersands', () => {
    it('should replace &amp; with &', () => {
      const result = readTweets.replaceAmpersands(['hello &amp; world, hello &amp; earth'])
      expect(result).toEqual(["hello & world, hello & earth"])
    })
  })

  describe('trimWhitespace', () => {
    it('should trim whitespace from start and end of entries in the array', () => {
      const result = readTweets.trimWhitespace(['  hello  '])
      expect(result).toEqual(['hello'])
    })
  })

  describe('shuffleArray', () => {
    it('randomises the array', () => {
      const result = readTweets.shuffleArray(['1', '2', '3', '4'])
      expect(result).toBeDefined
      expect(result).not.toEqual(['1', '2', '3', '4'])
      expect(result).toContain('1')
      expect(result).toContain('2')
      expect(result).toContain('3')
      expect(result).toContain('4')
    })
  })

  describe('composeTweet', () => {
    it('should create a tweet of no more than 270 chars', () => {
      const result = readTweets.composeTweet(['tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet', 'tweet'])
      expect(result).toHaveLength(269)
    })
  })

  describe('makeTweet', () => {
    it('should create a tweet')
  })
})
