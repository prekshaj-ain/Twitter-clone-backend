const express = require("express");
const { imageUpload } = require("../../controller/imageUpload-controller");
const {
  createTweet,
  getTweet,
  getAllTweets,
} = require("../../controller/tweet-controllers");
const { toggleLike } = require("../../controller/like-controller");
const { createComment } = require("../../controller/comment-controller");
const {
  create,
  signin,
  handleRefresh,
  logout,
  getUserById,
} = require("../../controller/user-controller");

const router = express.Router();
router.post("/upload", imageUpload);

router.post("/tweets", createTweet);
router.get("/tweets", getAllTweets);
router.get("/tweets/:id", getTweet);

router.post("/likes/toggle", toggleLike);

router.post("/comments", createComment);

router.post("/signup", create);
router.post("/signin", signin);
router.get("/refresh", handleRefresh);
router.get("/logout", logout);
router.get("/users/:id", getUserById);

module.exports = router;
