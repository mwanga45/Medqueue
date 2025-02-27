import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";
import Icon from "react-native-vector-icons/FontAwesome5"

const Booking = () => {
  return (
    <View style={bookingstyles.maincontainer}>
      <View style={bookingstyles.bkcontainer}>
        <View style = {bookingstyles.Dperiod}>
           <View style = {bookingstyles.period}><Text style= {bookingstyles.Dperiodname}>Morning</Text></View>
           <View style = {bookingstyles.period}><Text style= {bookingstyles.Dperiodname}>Afternoon</Text></View>
           <View style = {bookingstyles.period}><Text  style= {bookingstyles.Dperiodname}>Evening</Text></View>
           <View style = {bookingstyles.period}><Text  style= {bookingstyles.Dperiodname}>Night</Text></View>
        </View>
        <View style= {bookingstyles.bookng}>
             <View>
                <View style={bookingstyles.descriptiontxt}>
                    <Icon name="calendar" size={20}></Icon>
                    <Text style = {{color:"grey",fontSize:16}}>Select the meeting date</Text>
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
  descriptiontxt:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    columnGap:12

  },
  bookng:{
   width:"94%",
   backgroundColor:"white",
   paddingHorizontal:4,
   borderRadius:23,
   paddingHorizontal:12,
   paddingVertical:12
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:89

  },

});

export default Booking;
