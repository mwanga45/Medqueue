import React, { useState } from "react";
import { View, Text, Modal, Image, StyleSheet, Alert } from "react-native";
import DeviceInfo  from "react-native-device-info"
import axios from "axios"
const Viewdetails = ({ isvisible, setisvisible }) => {
    const [userdetails,setuserdetails] = useState({
        name:"",
        deviceId:"",
        Phone:"",
        Home_Address:""

    })
    const handleUserdetails = async()=>{
        try{
            const deviceId = await DeviceInfo.getUniqueId()
            const response = await axios.post("http://192.168.139.251:8800/userinfo",{deviceId})
            if (response.data.success){
                const endpoint = response.data
                setuserdetails({
                    name:endpoint.data.name,
                    deviceId:endpoint.data.deviceId,
                    Phone:endpoint.data.phone_numb,
                    Home_Address:endpoint.data?.phone_numb ||"None"
                })
            }else{
                Alert.alert("Something went Wrong", response.data.message|| "failed to fetch data")
            }
        }catch(err){
           console.error("something went wrong", err)
        }
    }
  return (
    <Modal
      visible={isvisible}
      onRequestClose={() => setisvisible()}
      animationType="pageSheet"
    >
      <View style = {stylesModal.container}>
        <View style = {stylesModal.imageprofile}>
          <Image
            source={require("../../assets/images/favicon.png")}
            resizeMethod="resize"
          ></Image>
        </View>
        <View style = {stylesModal.detailssummary}>
          <Text>My details here</Text>
          <Text>Username:{userdetails.name} </Text>
          <Text>Phone_Number:{userdetails.Phone} </Text>
          <Text>Home Address:{userdetails.Home_Address} </Text>
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:"white"
   },
   imageprofile:{
    marginTop:12,
    justifyContent:"center",
    alignItems:"center",
   },
   detailssummary:{
    justifyContent:"center",
    flexDirection:"column",
    rowGap:10
   },
});

export default Viewdetails;
