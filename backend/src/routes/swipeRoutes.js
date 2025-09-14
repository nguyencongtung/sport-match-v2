const express = require('express');
const router = express.Router();
const swipeController = require('../controllers/swipeController');
const auth = require('../middleware/auth');

// @route   POST api/swipes
// @desc    Create a swipe (like/dislike)
// @access  Private
router.post('/', auth, swipeController.createSwipe);

// @route   GET api/swipes
// @desc    Get all swipes made by the user
// @access  Private
router.get('/', auth, swipeController.getSwipes);

module.exports = router;
