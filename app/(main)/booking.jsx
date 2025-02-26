import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";

const Booking = () => {
  return (
    <View style={bookingstyles.maincontainer}>
      <View style={bookingstyles.bkcontainer}>
        <View style = {bookingstyles.Dperiod}>
           <View style = {bookingstyles.period}><Text style= {bookingstyles.Dperiodname}>Morning</Text></View>
           <View style = {bookingstyles.period}><Text>Afternoon</Text></View>
           <View style = {bookingstyles.period}><Text>Evening</Text></View>
           <View style = {bookingstyles.period}><Text>Night</Text></View>
        </View>
        <View style= {bookingstyles.bookng}>
             <View>
                <View>
                    <Text>Dj Hallid</Text>
                </View>
                <View></View>
             </View>
        </View>

      </View>
      <Navigationbar />
    </View>
  );
};

const bookingstyles = StyleSheet.create({
  bookng:{
   width:"94%",
   backgroundColor:"white",
   paddingHorizontal:4
  },
  Dperiodname:{
    fontSize:17
  },
  period:{
    backgroundColor:"white",
    width:90,
    height:35,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:24,
    marginBottom:12,

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
