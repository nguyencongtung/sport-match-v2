const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// @route   GET api/chats
// @desc    Get all chats for the authenticated user
// @access  Private
router.get('/', auth, chatController.getChats);

// @route   GET api/chats/:chatId/messages
// @desc    Get messages for a specific chat
// @access  Private
router.get('/:chatId/messages', auth, chatController.getChatMessages);

// @route   POST api/chats/:chatId/messages
// @desc    Send a message in a specific chat
// @access  Private
router.post('/:chatId/messages', auth, chatController.sendMessage);

module.exports = router;
