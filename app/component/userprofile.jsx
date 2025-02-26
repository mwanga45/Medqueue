import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProf = () => {
  return (
    <View style={useprop.mainprofContainer}>
      <View style={useprop.profContainer}>
        <View style={useprop.imagecontainer}>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={useprop.imageprof}
          />
        </View>
        <View>
          <Text>Hello Issa Mwanga</Text>
        </View>
      </View>
    </View>
  );
};

const useprop = StyleSheet.create({
  mainprofContainer: {
    // flex: 1,
    // backgroundColor: "white"
  },
  profContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center", // ensures vertical centering
    flexDirection: "row"
  },
  imagecontainer: {
    height: 80,
    width: 80,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,      // half of 80 for a perfect circle
    overflow: 'hidden'     // clips any overflow content
  },
  imageprof: {
    height: 80,           // match the container's dimensions
    width: 80,
    resizeMode: "cover"    // or "contain" if you prefer to see the whole image
  }
});

export default UserProf;
