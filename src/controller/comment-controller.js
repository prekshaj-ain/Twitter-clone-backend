const commentService = new CommentService();

const createComment = async (req,res)=>{
    try{
        const response = await commentService.create(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
        res.status(201).json({
            success: true,
            data: response,
            message: 'successfullt created the comment',
            error: {},
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: "something went wrong",
            error: error,
        })
    }

}

module.exports = {
    createComment
}