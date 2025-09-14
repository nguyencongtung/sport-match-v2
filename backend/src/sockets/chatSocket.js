const Chat = require('../models/Chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected to socket.io');

    socket.on('joinChat', async ({ chatId, userId }) => {
      socket.join(chatId);
      console.log(`User ${userId} joined chat ${chatId}`);
      // Optionally, emit previous messages to the user
      const chat = await Chat.findById(chatId).populate('messages.sender', ['username']);
      if (chat) {
        socket.emit('previousMessages', chat.messages);
      }
    });

    socket.on('sendMessage', async ({ chatId, senderId, text }) => {
      try {
        let chat = await Chat.findById(chatId);
        if (!chat) {
          console.error('Chat not found for sendMessage:', chatId);
          return;
        }

        const newMessage = { sender: senderId, text, timestamp: new Date() };
        chat.messages.push(newMessage);
        chat.updatedAt = Date.now();
        await chat.save();

        // Emit the new message to all participants in the chat room
        io.to(chatId).emit('newMessage', newMessage);
      } catch (err) {
        console.error('Error sending message via socket:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from socket.io');
    });
  });
};
