const { TweetRepository, HashtagRepository } = require('../repository/index') 

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        try{
            const content = data.content;
            const hashtagRegex = /#[a-zA-Z0-9_]+/g;
            let hashtags = content.match(hashtagRegex);
            hashtags = hashtags.map(tag => tag.substring(1).toLowerCase());
            const tweet = await this.tweetRepository.create(data);
            let alreadyPresentTags = await this.hashtagRepository.findByName(hashtags);
            let titleOfTags = alreadyPresentTags.map(tag => tag.title);
            let newTags = hashtags.filter(tag => !titleOfTags.includes(tag));
            newTags = newTags.map(tag => {
                return {title: tag, tweets: [tweet.id]};
            });
            const response = await this.hashtagRepository.bulkCreate(newTags);
            alreadyPresentTags.forEach(tag => {
                tag.tweets.push(tweet.id);
                tag.save();
            })
            return tweet;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async update(){

    }

    async destroy(){

    }

    async get(id){
        try{
            const tweet = await this.tweetRepository.getWithComments(id);
            return tweet;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}
module.exports = TweetService;