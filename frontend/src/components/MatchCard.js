import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MatchCard({ match }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{match.title}</Text>
      <Text style={styles.sport}>{match.sport}</Text>
      <Text style={styles.location}>{match.location}</Text>
      <Text style={styles.date}>{match.date}</Text>
      {/* Add more match details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sport: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});

export default MatchCard;
