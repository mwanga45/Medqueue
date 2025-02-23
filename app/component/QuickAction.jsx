import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QuickAction = ({ backgroundColor, text, size, name }) => {

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
      <Icon size={size} name={name} style={{ color: "white" }} />
      <Text style={{ color: "white" }}>{text}</Text>
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
    boxShadow:
      "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
  },
});
