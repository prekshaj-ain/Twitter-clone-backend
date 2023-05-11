const Hashtag = require("../models/hashtags");


class HashtagRepository{

    async create(data){
        try{
            const hashtag = await Hashtag.create(data);
            return hashtag;
        }catch(error){
            console.log('Error in repository layer');
            throw error;
        }
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
    async get(id){
        try{
            const hashtag = await Hashtag.findById(id);
            return hashtag;  
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
    async destroy(id){
        try{
            await Hashtag.findByIdAndRemove(id);
            return true;
        }catch(error){
            console.log('Error in repository layer');
            throw error;
        }
    }
}

module.exports = HashtagRepository;