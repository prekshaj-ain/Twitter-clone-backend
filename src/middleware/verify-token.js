const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401);
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      data: [],
      error: "You are not authenticated",
      message: "Authentication failed",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      data: [],
      error: err,
      message: "Authentication failed",
    });
  }
};

module.exports = verifyToken;
