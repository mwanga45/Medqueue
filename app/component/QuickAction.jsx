import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QuickAction = ({ backgroundColor, text, size, name, onclick }) => {

  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {

    const updateDimensions = ({ window }) => {
      setScreenWidth(window.width);
    };
    const subscription = Dimensions.addEventListener("change", updateDimensions);

    // Cleanup the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  // Use screenWidth in your styles, here we set the container width to 90% of screen width
  return (
    <View style={[Quickstyles.Quickcontainer, { backgroundColor, width: screenWidth * 0.45 }]}>
      <TouchableOpacity onPress={onclick}>
      <Icon size={size} name={name} style={{ color: "white" }} />
      <Text style={{ color: "white" }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickAction;
// not that the usage of the svh value for height isnt work for some platform
const Quickstyles = StyleSheet.create({
  Quickcontainer: {
    display: "flex",
    height: "auto", 
    padding: 12,    
    margin: 4,       
    color: "white",
    borderRadius: 15, 
    shadowColor: "rgba(0, 0, 0, 0.09)",  // Using one of the outer shadow colors from your example
    shadowOffset: { width: 0, height: 32 }, // Choosing one of the offsets (e.g., 32px)
    shadowOpacity: 0.5,                    // Adjust to your liking
    shadowRadius: 16,                      // Adjust to match the blur
    // Android shadow (elevation)
    elevation: 10,                         // Adjust for similar effect on Android
  },
});
