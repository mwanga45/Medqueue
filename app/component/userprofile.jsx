import React, { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios'
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"

const UserProf = ({Age}) => {
  const [userdetails, setuserdetails]= useState([])
  // const [deviceID, setdeviceID] = useState("")
  // const handlesendDeviceid =async({deviceId})=>{
  //   try{
  //    const respond_id =  await axios.post("http://192.168.104.251:8800/userinfo", deviceId)
  //     setdeviceID(respond_id)
  //   }catch(err){
  //     console.error("Something went wrong",err)
  //   }
  // }

  const handleuserdetails = async()=>{
    try{

      const respond = await axios.get("http://192.168.104.251:8800/userinfo")
      const userdetail = respond.data
      if (respond.success == true){
        setuserdetails(userdetail)
      }else{
        Alert.alert("Failed to return data")
      }
  
    }catch (err){
      console.error("Something went wrong",err)
    }

    }
  useEffect(()=>{
    // const deviceId = DeviceInfo.getDeviceId()
    // handlesendDeviceid(deviceId)
    // handleuserdetails()
  },[])
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
          <Text style = {useprop.usernamestyles}>Hello, {userdetails.full}</Text>
          <Text>Status:Age{Age}</Text>
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
    // backgroundColor: "#f5f5f5",
    backgroundColor:"transparent",
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
    overflow: 'hidden',
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.15,
shadowRadius: 1.00,
elevation: 1  
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
