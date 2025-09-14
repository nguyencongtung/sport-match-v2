const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middleware/auth');

// @route   POST api/matches
// @desc    Create a new match
// @access  Private
router.post('/', auth, matchController.createMatch);

// @route   GET api/matches
// @desc    Get all matches
// @access  Private (or Public with filters)
router.get('/', auth, matchController.getMatches);

// @route   GET api/matches/:id
// @desc    Get match by ID
// @access  Private (or Public with filters)
router.get('/:id', auth, matchController.getMatchById);

// @route   POST api/matches/:id/join
// @desc    Join a match
// @access  Private
router.post('/:id/join', auth, matchController.joinMatch);

// @route   POST api/matches/:id/leave
// @desc    Leave a match
// @access  Private
router.post('/:id/leave', auth, matchController.leaveMatch);

module.exports = router;
