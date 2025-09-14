import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CreateMatchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Match Screen</Text>
      {/* Match creation form will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CreateMatchScreen;
