const User = require("../models/user");
const CrudRepository = require("./crud-repository");

class UserReposiory extends CrudRepository{
    constructor(){
        super(User);
    }
}

module.exports = UserReposiory;