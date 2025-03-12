import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const UserReg = ({close}) => {;
  return (
    <View style={reg.userregcontainer}>
      <View style={reg.close}>
        <TouchableOpacity>
          <Icon name="times" size={24} color="rgb(74, 73, 73)" onPress={close} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 24, color: "grey", fontWeight: "900" }}>
          Register User
        </Text>
      </View>
      <View style={reg.formregpart}>
        <TextInput
          nativeID="name"
          placeholder="full name please"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop:30
          }}
        />
        <TextInput
          nativeID="name"
          placeholder="Phone number eg 07......."
          keyboardType="numeric"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop:30,
          }}
        />
        <TextInput
          nativeID="name"
          placeholder="email please"
          keyboardType="email-address"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop:30
          }}
        />
        <TextInput
          nativeID="name"
          placeholder="home address if you have please"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop:30
          }}
        />
        <TouchableOpacity style={{backgroundColor:"rgb(35, 35, 35)", marginTop:32,height:39,width:200, justifyContent:"center", alignItems:"center",borderRadius:10,}}> 
          <Text style={{color:"white", fontSize:18, letterSpacing:2}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const reg = StyleSheet.create({
  userregcontainer: {
    position: "absolute",
    height: 550,
    backgroundColor: "white",
    top: 200,
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
  close: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 12,
  },
  formregpart:{
   justifyContent:"center",
   alignItems:"center",
   columnGap:12,
  },
});
export default UserReg;
