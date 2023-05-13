const { default: mongoose } = require("mongoose");

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max : [250, 'Tweet cannot be more than 250 characters']
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet',tweetSchema);

module.exports = Tweet;