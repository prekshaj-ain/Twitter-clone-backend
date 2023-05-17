const express = require('express');
const { createTweet, getTweet } = require('../../controller/tweet-controllers');
const { toggleLike } = require('../../controller/like-controller');
const { createComment } = require('../../controller/comment-controller');
const { create } = require('../../controller/user-controller');

const router = express.Router();

router.post('/tweets', createTweet);
router.get('/tweets/:id', getTweet);

router.post('/likes/toggle',toggleLike);

router.post('/comments',createComment);

router.post('/signup',create);

module.exports = router;