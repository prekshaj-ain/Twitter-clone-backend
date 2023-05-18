const TweetService = require("../service/tweet-service")
const upload = require('../config/file-upload-s3-config');

const singleUploader = upload.single('image')
const tweetService = new TweetService();

const createTweet = async (req,res)=>{
    try{
        singleUploader(req,res,function(err,data){
            if(err){
                return res.status(500).json({error: err});
            }
            console.log(req.file);
            return res.status(200).json({msg: 'ok'})
        })
        // const response = await tweetService.create(req.body);
        // return res.status(201).json({
        //     success: true,
        //     error: {},
        //     data: response,
        //     message: 'Successfully created a tweet'
        // })  
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error,
            data: {},
            message: 'Something went wrong'
        })
    }
}

const getTweet = async (req,res)=>{
    try{
        const response = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: 'Successfully fetched the tweet'
        })  
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error,
            data: {},
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    createTweet,
    getTweet
}