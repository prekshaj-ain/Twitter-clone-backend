const Tweet = require("../models/tweet");
const CrudRepository = require("./crud-repository");

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
  async getAll(skip, limit) {
    try {
      const tweets = await Tweet.find()
        .populate("author", "-password -email -refreshToken")
        .populate("likes")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // recent first
      return tweets;
    } catch (error) {
      console.log("Repository layer error");
      throw error;
    }
  }

  async get(id) {
    try {
      const tweet = await Tweet.findById(id).populate("likes");
      return tweet;
    } catch (error) {
      console.log("Repository layer error");
      throw error;
    }
  }

  async getWithComments(id) {
    try {
      const tweet = await Tweet.findById(id)
        .populate({
          path: "comments",
          populate: {
            path: "comments",
          },
        })
        .lean();
      return tweet;
    } catch (error) {
      console.log("Repository layer error");
      throw error;
    }
  }
}
module.exports = TweetRepository;
