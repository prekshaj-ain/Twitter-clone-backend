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

module.exports = {
    create
}