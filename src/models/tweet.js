const { default: mongoose } = require("mongoose");

const tweetSchema = new mongooose.Schema({
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet',tweetSchema);

module.exports = Tweet;