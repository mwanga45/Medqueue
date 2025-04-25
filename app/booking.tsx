import React from 'react';
import { View, Text,Dimensions,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const {height, width} = Dimensions.get("window")
const Booking = () => {
  return (
    <SafeAreaView style={stylesbooking.container} >
      <View style={stylesbooking.userprofile}></View>
      <View  style={stylesbooking.bookingcontainer}></View>
    </SafeAreaView>
  );
}
const stylesbooking = StyleSheet.create({
container:{
    flex:1,
    paddingHorizontal:12,
    flexDirection:"row",
},
userprofile:{
    justifyContent:"flex-start",
    backgroundColor:"blue",
    height:height *0.08,
    width:width,
},
bookingcontainer:{
    justifyContent:"flex-end"
    

}
})

export default Booking;
