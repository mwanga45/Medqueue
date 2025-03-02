import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";
import { ScrollView } from "react-native";

const Emergence = () => {
  return (
    <View style={emergencestyles.maincontainer}>
      <View style={emergencestyles.mapcontainer}>
        <Text>Map view</Text>
      </View>
      <ScrollView>
        <View>
          <Text>Emergence-type</Text>
        </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};
const emergencestyles = StyleSheet.create({
  mapcontainer: {
    width:"60%"
  },
  maincontainer: {
    flex: 1,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    backgroundColor: "white",
    paddingHorizontal:12,
    paddingVertical:34

  },
});

export default Emergence;
