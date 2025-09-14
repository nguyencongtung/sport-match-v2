const Chat = require('../models/Chat');
const User = require('../models/User');

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', ['username', 'profile.profilePicture'])
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('messages.sender', ['username']);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }
    // Ensure the current user is a participant in the chat
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ msg: 'Not authorized to view this chat' });
    }
    res.json(chat.messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;
  const sender = req.user.id;

  try {
    let chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    // Ensure the current user is a participant in the chat
    if (!chat.participants.includes(sender)) {
      return res.status(403).json({ msg: 'Not authorized to send messages in this chat' });
    }

    const newMessage = { sender, text };
    chat.messages.push(newMessage);
    chat.updatedAt = Date.now();
    await chat.save();

    res.json(chat.messages[chat.messages.length - 1]); // Return the newly sent message
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
