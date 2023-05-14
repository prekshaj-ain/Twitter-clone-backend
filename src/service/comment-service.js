const { TweetRepository, CommentRepository } = require("../repository");

class CommentService{
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async create(modelId, modelType, userId, content){
        if(modelType === 'Tweet'){
            var commentable = await this.tweetRepository.get(modelId);
        }else if(modelType === 'Comment'){
            var commentable = await this.commentRepository.get(modelId);
        }else {
            throw new Error('Unknown mondel type');
        }

        const comment = await this.commentRepository.create({
            content: content,
            user: userId,
            onModel: modelType,
            commentable: modelId,
            comments: [],
        });
        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

module.exports = CommentService;