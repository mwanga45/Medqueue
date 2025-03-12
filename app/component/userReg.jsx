import React from "react";
import  { View ,StyleSheet,Text,TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';

const UserReg = () => {
  return (
    <View style={reg.userregcontainer}>
      <View style={reg.close}>
      <TouchableOpacity >
      <Icon name="times" size={24} color="rgb(74, 73, 73)" />
      </TouchableOpacity>
      </View>
      <View>
        <Text style={{fontSize:24, color:"grey", fontWeight:"900"}}>Register User</Text>
      </View>
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
  close:{
   width:"100%",
   justifyContent:"center",
   alignItems:"flex-end",
   padding:12
  }
});
export default UserReg;
