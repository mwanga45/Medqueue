import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";
import { ScrollView } from "react-native";
import UserProf from "../component/userprofile";

const Emergence = () => {
  return (
    <View style={emergencestyles.maincontainer}>
      {/* <View style={emergencestyles.mapcontainer}>
        <Text>Map view</Text>
      </View> */}
      <ScrollView>
        <View style = {emergencestyles.emergencesection}>
          <View>
             <UserProf/>
          </View>
        </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};
const emergencestyles = StyleSheet.create({
  emergencesection:{
    flex:1,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:12,
    paddingHorizontal:12,
    // flexDirection:"row",
    // columnGap:12

  },
  // mapcontainer: {
  //   width:"50%"
  // },
  maincontainer: {
    flex: 1,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    backgroundColor: "#eff5ec",
    paddingHorizontal:1,
    paddingVertical:34

  },
});

export default Emergence;
