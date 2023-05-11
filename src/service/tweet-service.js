const { TweetRepository } = require('../repository/index') 

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository()
    }

    async create(data){
        try{
            const content = data.content;
            const hashtagRegex = /#[a-zA-Z0-9_]+/g;
            let hashtags = content.hashtag(hashtagRegex);
            hashtags = hashtags.map(tag => tag.substring().toLowerCase());
            const tweet = await this.tweetRepository.create(data);
            return tweet;
        }catch(error){
            console.log('Service layer error');
            throw error;
        }
    }

    async update(){

    }

    async destroy(){

    }

    async get(){

    }
}
module.exports = TweetService;