import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sports } from '../../../shared/constants/sports'; // Assuming sports constants are here

const API_URL = 'http://localhost:3000/api'; // Replace with your backend API URL

function CreateMatchScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState('10');
  const [skillLevel, setSkillLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Optionally, fetch user's current location to pre-fill
    // For simplicity, we'll leave it manual for now.
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleCreateMatch = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'You need to be logged in to create a match.');
        setLoading(false);
        return;
      }

      const newMatch = {
        title,
        sport,
        description,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          address: locationAddress,
        },
        date: date.toISOString(),
        maxParticipants: parseInt(maxParticipants, 10),
        skillLevel,
      };

      await axios.post(`${API_URL}/matches`, newMatch, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Success', 'Match created successfully!');
      navigation.goBack(); // Go back to previous screen (e.g., MatchingScreen)
    } catch (err) {
      console.error('Error creating match:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to create match. Please check your input.');
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Match</Text>

      <TextInput
        style={styles.input}
        placeholder="Match Title"
        value={title}
        onChangeText={setTitle}
      />

      <Picker
        selectedValue={sport}
        style={styles.picker}
        onValueChange={(itemValue) => setSport(itemValue)}
      >
        <Picker.Item label="Select Sport" value="" />
        {sports.map((s) => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Location Address"
        value={locationAddress}
        onChangeText={setLocationAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text>Select Date: {date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Max Participants (e.g., 10)"
        value={maxParticipants}
        onChangeText={setMaxParticipants}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={skillLevel}
        style={styles.picker}
        onValueChange={(itemValue) => setSkillLevel(itemValue)}
      >
        <Picker.Item label="Select Skill Level (Optional)" value="" />
        <Picker.Item label="Beginner" value="Beginner" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Advanced" value="Advanced" />
      </Picker>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCreateMatch} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Match</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
  },
  datePickerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CreateMatchScreen;
