import React from "react";
import Icon from "react-native"
import { View, Text, StyleSheet } from "react-native";

const UserReg = () => {
  return (
    <View style={reg.userregcontainer}>
      <Text>hello user</Text>
    </View>
  );
};

const reg = StyleSheet.create({
  userregcontainer: {
    position: "absolute",
    height: 450,
    backgroundColor: "white",
    top: 300,
    width: "90%",
    right: 17,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    zIndex: 100,
  },
});
export default UserReg;
