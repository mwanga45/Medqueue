import React from "react";
import { View, Text , StyleSheet} from "react-native";
import Navigationbar from "../component/navigation";

const Booking = () => {
  return (
    <View style = {bookingstyles.maincontainer}>
      <Text>hello world</Text>
      <Navigationbar />
    </View>
  );
};

const bookingstyles =  StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:"#4CAF50",
    }
})

export default Booking;
