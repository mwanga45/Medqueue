import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Homepage = () => {
  return (
    <View style={styles.HomepageContainer}>
      <View style ={styles.Homepagecover1}>
        <Text >Hello world</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  HomepageContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingLeft:1,
    paddingRight:1,
    paddingBottom:1
  },
  Homepagecover1:{
    justifyContent:"center",
    borderRadius:"15px",
    height:"50%",
    width:"cover",
    alignItems:"center",
    backgroundColor:"#338117",
    boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
    

  }
});
