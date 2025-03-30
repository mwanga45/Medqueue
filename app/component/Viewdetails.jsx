import React, { useState } from "react";
import { View, Text, Modal, Image, StyleSheet } from "react-native";
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
      <View>
        <View>
          <Image
            source={require("../../assets/images/favicon.png")}
            resizeMethod="resize"
          ></Image>
        </View>
        <View>
          <Text>My details here</Text>
          <Text>Username: </Text>
          <Text>Phone_Number: </Text>
          <Text>Home Address: </Text>
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({});

export default Viewdetails;
