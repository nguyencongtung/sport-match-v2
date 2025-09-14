import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ChatBubble({ message, isMyMessage }) {
  return (
    <View style={[styles.bubble, isMyMessage ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default ChatBubble;
