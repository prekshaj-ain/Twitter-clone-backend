const express = require('express');
const { createTweet } = require('../../controller/tweet-controllers');
const { toggleLike } = require('../../controller/like-controller');
const { createComment } = require('../../controller/comment-controller');

const router = express.Router();

router.post('/tweets', createTweet);

router.post('/likes/toggle',toggleLike);

router.post('/comments',createComment);

module.exports = router;