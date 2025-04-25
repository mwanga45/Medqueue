import React from 'react';
import { View, Text,Dimensions,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const {height, width} = Dimensions.get("window")
const Booking = () => {
  return (
    <SafeAreaView style={stylesbooking.container} >
      <View style={stylesbooking.userprofile}></View>
      <View style={stylesbooking.bookingcontainer}>
        <View style ={stylesbooking.bookingforcontainer}></View>
        <View style = {stylesbooking.bookingpage}></View>
      </View>
    </SafeAreaView>
  );
}
const stylesbooking = StyleSheet.create({
container:{
    flex:1,
    paddingHorizontal:12,
    flexDirection:"column",
    height:height,
    rowGap:height * 0.214,
    justifyContent:"center",
    alignItems:"center"
},
userprofile:{
    justifyContent:"space-between",
    backgroundColor:"blue",
    height:height *0.08,
    width:width*0.96,
},
bookingcontainer:{
  flexDirection:"column",
  height:height *0.7,
  width:width *0.96,
  rowGap:"5%",
  padding:0,

},
bookingforcontainer:{
  flexDirection:"row",
  columnGap:3,
  height:"10%"
  
},
bookingpage:{
  backgroundColor:"#d4f3e3",
  height:"85%",
  borderRadius:23,
 
}
})

export default Booking;
