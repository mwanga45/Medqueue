import React from "react";
import { View, Text, StyleSheet, TextInput ,Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserRegistration = () => {
  return (
    <SafeAreaView style={stylesform.container}>
      <View style={stylesform.descriptionform}>
        <Text style={{ fontSize: 29, color: "#454345", fontWeight: 800 }}>
          Get Started Now{" "}
        </Text>
        <Text style={{ fontSize: 16, color: "grey", fontWeight: "400" }}>
          Create an Account to get Full access of our service
        </Text>
      </View>
      <View style={stylesform.formcontainer}>
        <View style={stylesform.NamesUser}>
          <TextInput style={{width:"50%" ,borderWidth:1}}>home</TextInput>
          <TextInput style={{width:"50%",borderWidth:1}}>school</TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};
const stylesform = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderColor: "grey",
    borderWidth: 5,
    width: "100%",
  },
  descriptionform: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  formcontainer: {
    width: "100%",
    padding: 10,
  },
  NamesUser: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    columnGap:10
  },
});
export default UserRegistration;
