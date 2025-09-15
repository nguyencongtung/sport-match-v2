import React from 'react';
import './ChatScreen.css';
import ChatBubble from '../components/ChatBubble';

function ChatScreen() {
  const dummyMessages = [
    { id: 1, text: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, text: 'Hello! How are you?', timestamp: '10:01 AM' },
    { id: 3, text: 'I am good, thanks! How about you?', timestamp: '10:05 AM' },
  ];

  return (
    <div className="chat-screen">
      <h2>Chat</h2>
      <div className="message-list">
        {dummyMessages.map((message, index) => (
          <ChatBubble key={message.id} message={message} isMyMessage={index % 2 === 0} />
        ))}
      </div>
      {/* Add message input and send button */}
    </div>
  );
}

export default ChatScreen;
