import React from 'react';
import './ChatBubble.css';

function ChatBubble({ message, isMyMessage }) {
  return (
    <div className={`chat-bubble ${isMyMessage ? 'my-message' : 'other-message'}`}>
      <p className="message-text">{message.text}</p>
      <span className="timestamp">{message.timestamp}</span>
    </div>
  );
}

export default ChatBubble;
