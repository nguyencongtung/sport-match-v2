import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_URL = 'http://localhost:3000'; // Replace with your backend socket URL

function ChatScreen({ route }) {
  const { chatId, recipientId } = route.params;
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId'); // Assuming userId is stored in AsyncStorage
      setUserId(storedUserId);
    };

    fetchUserId();

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket.io server');
      if (chatId && userId) {
        newSocket.emit('joinChat', { chatId, userId });
      }
    });

    newSocket.on('previousMessages', (prevMessages) => {
      const formattedMessages = prevMessages.map(msg => ({
        _id: msg._id,
        text: msg.text,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.sender._id,
          name: msg.sender.username,
        },
      }));
      setMessages(GiftedChat.append([], formattedMessages.reverse()));
      setLoading(false);
    });

    newSocket.on('newMessage', (message) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [{
        _id: message._id || Math.random().toString(),
        text: message.text,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.sender, // Assuming sender is just the ID for new messages
          name: 'Unknown User', // Will be updated if sender info is available
        },
      }]));
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId, userId]); // Re-run effect if chatId or userId changes

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    newMessages.forEach(msg => {
      if (socket && chatId && userId) {
        socket.emit('sendMessage', {
          chatId,
          senderId: userId,
          text: msg.text,
        });
      }
    });
  }, [socket, chatId, userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
