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
    const { refreshToken, ...others } = response;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      data: others,
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
      req.body.Email,
      req.body.Password
    );
    const { refreshToken, ...others } = response;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      data: others,
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

const handleRefresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401);
    }
    const response = await userService.handleRefresh(cookies.jwt);
    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully generated New Token",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to generate Token",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204);
    }
    await userService.logout(cookies.jwt, res);
    return res.status(204).json({
      data: {},
      success: true,
      message: "successfully logout",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to Logout",
      error: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.get(req.params.id);
    return res.status(200).json({
      data: { user },
      success: true,
      message: "successfully fetched user",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the user",
      error: error,
    });
  }
};

module.exports = {
  create,
  signin,
  handleRefresh,
  logout,
  getUserById,
};
