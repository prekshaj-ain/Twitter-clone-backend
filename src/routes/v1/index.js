const express = require('express');
const { createTweet } = require('../../controller/tweet-controllers');

const router = express.Router();

router.post('/tweets', createTweet);

module.exports = router;