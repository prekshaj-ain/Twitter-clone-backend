const UserService = require("../service/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.Email,
      password: req.body.Password,
      name: req.body.Name,
      username: req.body.Username,
    });
    res.cookie("jwt", response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      data: response.accessToken,
      success: true,
      message: "User created successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create the user",
      error: error,
    });
  }
};
const signin = async (req, res) => {
  try {
    const response = await userService.signin(
      req.body.email,
      req.body.password
    );
    res.cookie("jwt", response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      data: response.accessToken,
      success: true,
      message: "User logged in successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to login the user",
      error: error,
    });
  }
};

module.exports = {
  create,
  signin,
};
