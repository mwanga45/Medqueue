import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";

const Booking = () => {
  return (
    <View style={bookingstyles.maincontainer}>
      <View style={bookingstyles.bkcontainer}>
        <View><Text>Hello</Text></View>
      </View>
      <Navigationbar />
    </View>
  );
};

const bookingstyles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#4CAF50",
    // paddingHorizontal:23
  },
  bkcontainer: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Booking;
