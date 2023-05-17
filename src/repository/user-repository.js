const User = require("../models/user");
const CrudRepository = require("./crud-repository");

class UserReposiory extends CrudRepository{
    constructor(){
        super(User);
    }

    async findBy(data){
        try{
            const user = await User.findOne(data);
            return user;
        }catch(error){
            conosle.log('error in repository layer');
            throw error;
        }
    }
}

module.exports = UserReposiory;