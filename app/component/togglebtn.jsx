import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';

const SlideButton3 = () => {
  // State to track if the button is active
  const [isActive, setIsActive] = useState(false);
  
  // Animated value for the slide effect
  const translateX = useRef(new Animated.Value(0)).current;
  
  // Dimensions for the slider (customizable)
  const BUTTON_WIDTH = 70;
  const BUTTON_HEIGHT = 40;
  const SLIDER_WIDTH = BUTTON_WIDTH - 10; // Leave some margin
  const SLIDER_SIZE = 30;

  // Handle button press animation
  const toggleButton = () => {
    // Determine the target position based on current state
    const toValue = isActive ? 0 : BUTTON_WIDTH - SLIDER_WIDTH - 5;
    
    // Animate the slider position
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Update the active state
    setIsActive(!isActive);
  };

  return (
    <View style={styles.container}>
      {/* Main button container */}
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={toggleButton}
        style={[
          styles.button,
          {
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            backgroundColor: isActive ? '#4CAF50' : '#e0e0e0',
          }
        ]}
      >
        {/* Sliding element */}
        <Animated.View
          style={[
            styles.slider,
            {
              width: SLIDER_WIDTH,
              height: SLIDER_SIZE,
              transform: [{ translateX }],
            }
          ]}
        />
      </TouchableOpacity>
      
      {/* Optional status text */}
      <Text style={styles.statusText}>
        {isActive ? 'ACTIVE' : 'INACTIVE'}
      </Text>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
  },
  slider: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default SlideButton3;