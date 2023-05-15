const Tweet = require("../models/tweet");
const CrudRepository = require("./crud-repository");

class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet);
    }
    async getAll(offset, limit){
        try{
            const tweets = await Tweet.find().skip(offset).limit(limit);
            return tweets;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }

    async get(id){
        try{
            const tweet = await Tweet.findById(id).populate('likes');
            return tweet;
        }catch(error){
            console.log('Repository layer error');
            throw error;
        }
    }
}
module.exports = TweetRepository;