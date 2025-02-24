import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const Dktcard = ({ specialist, name }) => {
  return (
    <LinearGradient
      colors={["rgba(0,36,2,1)", "rgba(19,213,84,1)", "rgba(3,234,25,1)"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={stylescard.Cardcontainer}
    >
      <View style = {stylescard.cardsides}>
        <View>
          <View style={stylescard.handlespecialist}>
            <Text style={stylescard.Specialist}>{specialist}</Text>
          </View>
          <View style={stylescard.handlename}>
            <Text style={stylescard.dktname}numberOfLines={1} ellipsizeMode={"middle"}>Dr.{name}</Text>
          </View>
        </View>
        <View>
            <Image source={require("../../assets/images/adaptive-icon.png")}
            style= {stylescard.image}
            />
        </View>
      </View>
    </LinearGradient>
  );
};

const stylescard = StyleSheet.create({
  Cardcontainer: {
    flex: 1,
    backgroundColor: "#d0f0c0",
    width: "95%",
    padding: 12,
    borderRadius: 15,
  },
  image:{
    width: 100,
    height: 100,
    resizeMode: "contain", // Adjusts image scaling mode

  },
//   always view component is flex so there is no need to write flex
  cardsides: {
    justifyContent:"space-between",
    flexDirection:"row"
  },
  handlespecialist: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: 100,
    borderRadius: 4,
    marginBottom: 12,
  },
  handlename: {
    width: 200,
    borderRadius: 4,
  },

  dktname: {
    color: "white",
    fontSize: 20,
  },
  Specialist: {
    color: "white",
    fontSize: 10,
  },
});

export default Dktcard;
