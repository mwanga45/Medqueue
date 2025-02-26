import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Dklistcard = () => {
  return (
    <View style={styleslistcard.dklcontainer}>
      <View style={styleslistcard.dkAgment}>
        <View style={styleslistcard.imgdk}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={{ height: 50, width: 60 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 600 , marginTop:9 }}>
            Dr. Jenny Wilson
          </Text>
          <Text>Bone Health</Text>
          <Text style={{ fontSize: 12, fontWeight: 400, color: "grey", marginTop:9 }}>
            10:25 AM - 11:25 AM Scheduled
          </Text>
        </View>
        <View style={styleslistcard.IconArrow}>
          <TouchableOpacity>
            <Icon name="chevron-right" size={20} style={{ color: "grey" }} />
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styleslistcard = StyleSheet.create({
  dklcontainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#f4f4f4",
    padding:8,
    width: "95%",
    borderRadius: 20,
    marginBottom:12
  },
  dkAgment: {
    flexDirection: "row",
    columnGap: 30,
  },
  imgdk: {
    backgroundColor: "#d7dfe7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 90,
    height: 80,
  },
  IconArrow: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:30
  },
});

export default Dklistcard;