import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper'; // You might need to install this: yarn add react-native-deck-swiper
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import UserCard from '../components/UserCard';

const API_URL = 'http://localhost:5001/api'; // Assuming your backend runs on port 5001

function FindFriendScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchUsersToSwipe();
  }, []);

  const fetchUsersToSwipe = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      // In a real app, this endpoint would return users based on matching criteria
      // For now, let's assume it returns a list of all users except the current one
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setUsers(response.data.filter(user => user._id !== JSON.parse(atob(token.split('.')[1])).user.id)); // Filter out current user
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
      setLoading(false);
    }
  };

  const handleSwipe = async (cardIndex, direction) => {
    const swipedUser = users[cardIndex];
    if (!swipedUser) return;

    const swipeDirection = direction === 'right' ? 'right' : 'left';

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please log in.');
        return;
      }

      const response = await axios.post(`${API_URL}/swipes`, {
        swipedId: swipedUser._id,
        direction: swipeDirection,
      }, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.match) {
        Alert.alert('Match!', `You matched with ${response.data.matchedUser.username}!`);
      }
    } catch (err) {
      console.error('Error creating swipe:', err);
      Alert.alert('Error', 'Failed to record swipe. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading potential friends...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchUsersToSwipe} />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUsersText}>No more users to swipe on!</Text>
        <Button title="Refresh" onPress={fetchUsersToSwipe} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find New Friends</Text>
      <Swiper
        ref={swiperRef}
        cards={users}
        renderCard={(user) => {
          if (!user) return null;
          return <UserCard user={user} />;
        }}
        onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, 'left')}
        onSwipedRight={(cardIndex) => handleSwipe(cardIndex, 'right')}
        cardIndex={0}
        backgroundColor={'#f0f0f0'}
        stackSize={3}
        verticalSwipe={false}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'red',
                borderColor: 'red',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
              }
            }
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'green',
                borderColor: 'green',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          }
        }}
      >
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  noUsersText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default FindFriendScreen;
