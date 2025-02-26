import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"

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
          <Text style = {useprop.usernamestyles}>Hello, Issa Mwanga</Text>
          <Text>Status</Text>
        </View>
        <View>
        <Icon name="chevron-right" size={20} style={{ color: "grey" }} />
        </View>
      </View>
    </View>
  );
};

const useprop = StyleSheet.create({
  mainprofContainer: {
    width:"100%",
    backgroundColor: "#f5f5f5",
    borderRadius:12
  },
  profContainer: {
    width: "100%",
    justifyContent:"space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical:12,
    paddingHorizontal:12,
    
  },
  imagecontainer: {
    height: 80,
    width: 80,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,      
    overflow: 'hidden'    
  },
  imageprof: {
    height: 80,           
    width: 80,
    resizeMode: "cover",
  },
  usernamestyles:{
    fontSize:20,
    fontWeight:"bold"
  }
});

export default UserProf;
