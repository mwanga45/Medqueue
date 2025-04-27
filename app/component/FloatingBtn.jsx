import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, PanResponder } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FloatingButton = ({isBoolean}) => {
  const [icon1Anim] = useState(new Animated.Value(0));
  const [icon2Anim] = useState(new Animated.Value(0));
  const [icon3Anim] = useState(new Animated.Value(0));
  const [pop, setPop] = useState(false);
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  )[0];

  const toggleMenu = () => {
    const toValue = pop ? 0 : 1;
    const animations = [
      Animated.spring(icon1Anim, { toValue: pop ? 0 : -80, useNativeDriver: false }),
      Animated.spring(icon2Anim, { toValue: pop ? 0 : -60, useNativeDriver: false }),
      Animated.spring(icon3Anim, { toValue: pop ? 0 : -80, useNativeDriver: false }),
    ];

    Animated.parallel(animations).start();
    setPop(!pop);
  };

  const handleUserPress = () => {
    // Close the menu first
    if (pop) {
      toggleMenu();
    }
    // Then call the isBoolean function if it exists
    if (isBoolean && typeof isBoolean === 'function') {
      isBoolean();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: pan.getTranslateTransform() }
      ]}
    >
      <Animated.View style={[styles.subButton, { transform: [{ translateY: icon1Anim }] }]}>
        <TouchableOpacity onPress={handleUserPress}>
          <Icon name="user" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[
        styles.subButton,
        { transform: [{ translateY: icon2Anim }, { translateX: icon2Anim }] }
      ]}>
        <TouchableOpacity>
          <Icon name="comments" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.subButton, { transform: [{ translateX: icon3Anim }] }]}>
        <TouchableOpacity>
          <Icon name="sign-out" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <View {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.mainButton} onPress={toggleMenu}>
          <Icon name="plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 530,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    backgroundColor: "#f52d56",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  subButton: {
    backgroundColor: "#f52d56",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
export default FloatingButton;