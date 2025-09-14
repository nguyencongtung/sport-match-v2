import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users'; // Assuming your backend runs on port 5001

function ProfileScreen() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    sports: [],
    skillLevel: '',
    location: { latitude: null, longitude: null },
    availability: [],
    profilePicture: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setProfile(response.data.profile || {}); // Set profile data, handle if profile is null
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to fetch profile.');
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please log in.');
        return;
      }

      await axios.put(`${API_URL}/profile`, profile, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={profile.firstName}
        onChangeText={(text) => setProfile({ ...profile, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={profile.lastName}
        onChangeText={(text) => setProfile({ ...profile, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Sports (comma-separated)"
        value={profile.sports ? profile.sports.join(', ') : ''}
        onChangeText={(text) => setProfile({ ...profile, sports: text.split(',').map(s => s.trim()) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Skill Level"
        value={profile.skillLevel}
        onChangeText={(text) => setProfile({ ...profile, skillLevel: text })}
      />
      {/* Location and Availability can be more complex, using simple text input for now */}
      <TextInput
        style={styles.input}
        placeholder="Profile Picture URL"
        value={profile.profilePicture}
        onChangeText={(text) => setProfile({ ...profile, profilePicture: text })}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
