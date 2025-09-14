const Chat = require('../models/Chat');
const User = require('../models/User'); // Import User model

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected to socket.io');

    socket.on('joinChat', async ({ chatId, userId }) => {
      socket.join(chatId);
      console.log(`User ${userId} joined chat ${chatId}`);
      // Optionally, emit previous messages to the user
      const chat = await Chat.findById(chatId).populate('messages.sender', ['username']);
      if (chat) {
        // Format messages for GiftedChat
        const formattedMessages = chat.messages.map(msg => ({
          _id: msg._id,
          text: msg.text,
          createdAt: msg.timestamp,
          user: {
            _id: msg.sender._id,
            name: msg.sender.profile.firstName || msg.sender.username, // Use first name or username
          },
        }));
        socket.emit('previousMessages', formattedMessages);
      }
    });

    socket.on('sendMessage', async ({ chatId, senderId, text }) => {
      try {
        let chat = await Chat.findById(chatId);
        if (!chat) {
          console.error('Chat not found for sendMessage:', chatId);
          return;
        }

        const sender = await User.findById(senderId);
        if (!sender) {
          console.error('Sender not found:', senderId);
          return;
        }

        const newMessage = { sender: senderId, text, timestamp: new Date() };
        chat.messages.push(newMessage);
        chat.updatedAt = Date.now();
        await chat.save();

        // Emit the new message to all participants in the chat room, with sender info
        io.to(chatId).emit('newMessage', {
          _id: newMessage._id,
          text: newMessage.text,
          createdAt: newMessage.timestamp,
          user: {
            _id: sender._id,
            name: sender.profile.firstName || sender.username,
          },
        });
      } catch (err) {
        console.error('Error sending message via socket:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from socket.io');
    });
  });
};
