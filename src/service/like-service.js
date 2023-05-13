const { LikeRepository, TweetRepository } = require("../repository");

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId){
        if(modelType === 'Tweet'){
            var likeable = await this.tweetRepository.get(modelId);
        }else if(modelType === 'Comment'){

        }else {
            throw new Error('Unknown mondel type');
        }

        const exists =  await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.remove();
            var isAdded = false;
        }
        else{
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId,
            });
            likeable.likes.push(newLike);
            await likeable.save();
            var isAdded = true;
        }

        return isAdded;

    }
}

moduke.exports = LikeService;