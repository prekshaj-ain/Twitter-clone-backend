const UserService = require('../service/user-service');

const userService = new UserService();

const create = async (req,res)=>{
    try{
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        return res.status(201).json({
            data: response,
            success: true,
            message: "User created successfully",
            error: {}
        })
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create the user',
            error: error
        })
    }
}
const signin = async (req,res)=>{
    try{
        const response = await userService.signin(req.body.email,req.body.password)
        return res.status(201).json({
            data: response,
            success: true,
            message: "User logged in successfully",
            error: {}
        })
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to login the user',
            error: error
        })
    }
}

module.exports = {
    create,
    signin
}