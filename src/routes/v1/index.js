const express = require('express');
const { createTweet } = require('../../controller/tweet-controllers');
const { toggleLike } = require('../../controller/like-controller');

const router = express.Router();

router.post('/tweets', createTweet);

router.post('/likes/toggle',toggleLike);

module.exports = router;