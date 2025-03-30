import React, { useEffect, useState } from "react";
import { View, Text, Modal, Image, StyleSheet, Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
const Viewdetails = () => {
  const [userdetails, setuserdetails] = useState({
    name: "",
    deviceId: "",
    Phone: "",
    Home_Address: "",
  });
  const handleUserdetails = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const response = await axios.post(
        "http://192.168.139.251:8800/userinfo",
        { deviceId }
      );
      if (response.data.success) {
        const endpoint = response.data;
        setuserdetails({
          name: endpoint.data.name,
          deviceId: endpoint.data.deviceId,
          Phone: endpoint.data.phone_numb,
          Home_Address: endpoint.data?.phone_numb || "None",
        });
      } else {
        Alert.alert(
          "Something went Wrong",
          response.data.message || "failed to fetch data"
        );
      }
    } catch (err) {
      console.error("something went wrong", err);
    }
    useEffect(()=>{
      handleUserdetails()
    },[])
  };
  return (
  
      <View style={stylesModal.container}>
        <View style={stylesModal.imageprofile}>
            <View style = {stylesModal.imageBackground}>
          <Image
            source={require("../../assets/images/favicon.png")}
            resizeMethod="resize"
          ></Image>
            </View>
        </View>
        <View style={stylesModal.detailssummary}>
          <Text style = {stylesModal.textstyle}>My details here</Text>
          <Text style = {stylesModal.textstyle}>Username:{userdetails.name} </Text>
          <Text style = {stylesModal.textstyle}>Phone_Number:{userdetails.Phone} </Text>
          <Text style = {stylesModal.textstyle}>Home Address:{userdetails.Home_Address} </Text>
        </View>
      </View>
  );
};

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical:100
  },
  imageprofile: {
    marginBottom:42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"black",
    height:100,

  },
  imageBackground:{
    backgroundColor:"blue",
    width:"50%",
    height:100,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:14
  },
  detailssummary: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems:"center",
    rowGap: 10,
  },
  textstyle:{
    color:"rgba(0,0,0,0.1)",
    fontSize:20,
  }

});

export default Viewdetails;
