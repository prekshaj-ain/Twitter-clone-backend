const Like = require("../models/like");
const Tweet = require("../models/tweet");

const toggleLike = async (io, tweetId, userId, modelType) => {
  try {
    // Handle the like action
    if (modelType === "Tweet") {
      var tweet = await Tweet.findById(tweetId).populate("likes");
    } else {
      throw "Unknown modelType";
    }

    const exists = await Like.findOne({
      onModel: modelType,
      likeable: tweetId,
      user: userId,
    });

    if (exists) {
      tweet.likes.pull(exists);
      await tweet.save();
      await Like.findByIdAndRemove(exists.id);
    } else {
      const newLike = await Like.create({
        onModel: modelType,
        likeable: tweetId,
        user: userId,
      });
      tweet.likes.push(newLike);
      await tweet.save();
    }
    // Emit an event to update the UI in real-time
    io.emit("likeUpdated", tweet);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { toggleLike };
