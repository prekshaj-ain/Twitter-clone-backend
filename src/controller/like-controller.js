const LikeService = require("../service/like-service")

const likeService = new LikeService()

const toggleLike = async (req,res)=>{
    try{
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully toggled the like",
            error: {}
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            data: {},
            success: false,
            message: 'something went wrong',
            error: error,
        })
    }
}


module.exports = {
    toggleLike
}