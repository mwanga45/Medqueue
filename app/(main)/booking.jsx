import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";

const Booking = () => {
  return (
    <View style={bookingstyles.maincontainer}>
      <View style={bookingstyles.bkcontainer}>
        <View style = {bookingstyles.Dperiod}>
           <View style = {bookingstyles.period}><Text>Morning</Text></View>
           <View style = {bookingstyles.period}><Text>Afternoon</Text></View>
           <View style = {bookingstyles.period}><Text>Evening</Text></View>
           <View style = {bookingstyles.period}><Text>Night</Text></View>
        </View>
        <View><Text>Hello</Text></View>
        <View><Text>Hello</Text></View>
      </View>
      <Navigationbar />
    </View>
  );
};

const bookingstyles = StyleSheet.create({
  period:{
    backgroundColor:"white",
    width:90,
    height:35,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:24

  },
  Dperiod:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:'center',
    width:"100%"
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "#4CAF50",
    // paddingHorizontal:23
  },
  bkcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },

});

export default Booking;
