const Tweet = require("../models/tweet");

class TweetRepository{
    async create(data){
        try{
            const tweet = await Tweet.create(data);
            return tweet;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }

    async update(id, data){
        try{
            const tweet = await Tweet.findByIdAndUpdate(id,data, {new: true});
            return tweet;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }

    async get(id){
        try{
            const tweet = await Tweet.findById(id);
            return tweet;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }

    async destroy(id){
        try{
            await Tweet.findByIdAndRemove(id);
            return true;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }
}
module.exports = TweetRepository;