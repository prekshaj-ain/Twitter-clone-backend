const Like = require("../models/like");
const CrudRepository = require("./crud-repository");

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like)
    }

    async findByUserAndLikeable(data){
        try{
            const like = await Like.findOne(data);
            return like;
        }catch(error){
            console.log('error in repository layer');
            throw error;
        }
    }

}

module.exports = LikeRepository;