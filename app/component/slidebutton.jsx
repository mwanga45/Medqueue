import React, { useRef, useState } from 'react';
import { Animated, View, PanResponder, Text, StyleSheet } from 'react-native';

const SlideButton = ({
  onSlideSuccess,
  sliderWidth = 250,
  sliderHeight = 50,
  buttonWidth = 50,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSuccess, setIsSuccess] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(animatedValue.__getValue());
      },
      onPanResponderMove: (evt, gestureState) => {
        // Limit sliding between 0 and the maximum slide distance
        if (gestureState.dx >= 0 && gestureState.dx <= sliderWidth - buttonWidth) {
          animatedValue.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        animatedValue.flattenOffset();
        if (gestureState.dx >= sliderWidth - buttonWidth) {
          // Slide reached the end; mark as success
          setIsSuccess(true);
          Animated.timing(animatedValue, {
            toValue: sliderWidth - buttonWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            if (onSlideSuccess) onSlideSuccess();
          });
        } else {
          // Slide did not reach the end; reset position
          Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth, height: sliderHeight }]}>
      <Animated.View
        style={[
          styles.sliderButton,
          {
            width: buttonWidth,
            height: sliderHeight,
            transform: [{ translateX: animatedValue }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.buttonText}>{isSuccess ? '✓' : '>>'}</Text>
      </Animated.View>
      {!isSuccess && (
        <View style={styles.sliderTextContainer}>
          <Text style={styles.sliderText}>Slide to confirm</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: '#ddd',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop:8
  },
  sliderButton: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  sliderTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  sliderText: {
    color: '#555',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SlideButton;
