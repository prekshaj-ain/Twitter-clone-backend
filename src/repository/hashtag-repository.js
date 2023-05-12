const Hashtag = require("../models/hashtags");
const CrudRepository = require("./crud-repository");


class HashtagRepository extends CrudRepository{
    constructor(){
        super(Hashtag);
    }

    async bulkCreate(tagList){
        try{
            const hashtags = await Hashtag.insertMany(tagList);
            return hashtags;
        }catch(error){
            console.log('Error in repository layer');
            throw error;
        }
    }
    
    async findByName(List){
        try{
            const hashtags = await Hashtag.find({title : List});
            return hashtags;
        }catch(error){
            console.log('Error in repository layer');
            throw error;
        }
    }
}

module.exports = HashtagRepository;