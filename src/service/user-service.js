const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_SECRET } = require('../config/serverConfig');

class UserService{

    constructor() {
        this.userRepository = new UserRepository();
    }

    #createToken(user){
        try{
            const result = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });
            return result;
        }catch(err){
            console.log('Something went wrong in token creation');
            throw err;
        }
    }
    #createRefreshToken(user){
        try{
            const result = jwt.sign(user, JWT_SECRET, { expiresIn: '1y' });
            return result;
        }catch(err){
            console.log('Something went wrong in refresh token creation');
            throw err;
        }
    }

    #checkPassword(userInputPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword,encryptedPassword);
        }catch(err){
            console.log('Something went wrong in password comparison');
            throw err;
        }
    }
    async create(data){
        try{
            const user = await this.userRepository.create(data);
            const newJWT = this.#createToken({email: user.email, id:user.id});
            const refreshJWT = this.#createRefreshToken({email: user.email, id:user.id});
            return {accessToken: newJWT, refreshToken:refreshJWT};
        }catch(err){
            console.log('Something went wrong at service layer');
            throw err;
        }
    }
    async signin(email, password){
        try{
            const user = await this.userRepository.findBy({email});
            if(!user){
                throw "user not found";
            }
            const passwordMatch = this.#checkPassword(password,user.password);
            if(!passwordMatch){
                throw 'incorrect password';
            }
            const newJWT = this.#createToken({email: user.email, id:user.id});
            const refreshJWT = this.#createRefreshToken({email: user.email, id:user.id});
            return {accessToken: newJWT, refreshToken:refreshJWT};
        }catch(err){
            throw err;
        }
    }
}

module.exports = UserService;