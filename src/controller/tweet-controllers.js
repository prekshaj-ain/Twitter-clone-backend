const TweetService = require("../service/tweet-service")

const tweetService = new TweetService();

const createTweet = async (req,res)=>{
    try{
        const response = await tweetService.create(req.body);
        return res.status(201).json({
            success: true,
            error: [],
            data: response,
            message: 'Successfully created a tweet'
        })  
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error,
            data: [],
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    createTweet
}