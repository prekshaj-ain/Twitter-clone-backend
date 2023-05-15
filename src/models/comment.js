const { default: mongoose } = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'],
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }]
},{timestamps : true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;