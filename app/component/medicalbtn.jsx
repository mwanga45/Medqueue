import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const MedicalButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Heart</Text>
        <Text style={styles.mainText}>Attack</Text>
      </View>
      <Text style={styles.timeText}>15min</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'flex-start',
  },
});

export default MedicalButton;