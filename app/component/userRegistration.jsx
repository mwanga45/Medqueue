import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput ,Dimensions, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeviceId } from "../utils/deviceId";
const {height} = Dimensions.get('window')


const UserRegistration = () => {
  const [deviceId , setdeviceId] = useState<any>(null)
  const [FormField, setFormField] = useState<any>({
    firstname:"",
    secondname:"",
    secretekey:"",
    confirmkey:"",
    dial:"",
    email:"",
    birthdate:"",
    homeaddress:""
  })
  const handleInputOnchange =()=>{
    
  }
    useEffect(()=>{
      (async() =>{
        const id = await getDeviceId()
        setdeviceId(id)
      })
    })
  return (
    <SafeAreaView style={stylesform.container}>
      <View style={stylesform.descriptionform}>
        <Text style={{ fontSize: 29, color: "#454345", fontWeight: 800 }}>
          Get Started Now{" "}
        </Text>
        <Text style={{ fontSize: 16, color: "grey", fontWeight: "400" }}>
          Create an Account to get Full access of our service
        </Text>
      </View>
      <View style={stylesform.formcontainer}>
        <View style={stylesform.NamesUser}>
          <TextInput style={{width:"50%" ,borderWidth:2, height:height*0.05,borderRadius:23,paddingHorizontal:12, borderColor:"grey"}} placeholder="firstname"></TextInput>
          <TextInput style={{width:"50%",borderWidth:2,height:height*0.05, paddingHorizontal:12, borderRadius:23, borderColor:"grey"}} placeholder="secondname"></TextInput>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Secrete Key.."/>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Confirm-Secrete Key.."/>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Dial +255..."/>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Birthdate.."/>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Email.."/>
        </View>
        <View style={stylesform.container_inputField}>
            <TextInput style={stylesform.inputfield} placeholder="Home address.."/>
        </View>
         <TouchableOpacity style={stylesform.btn} >
            <Text style={{color:"white", fontSize:20, fontWeight:"700"}}>Sign Up</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const stylesform = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor:"#F5F5F5",
    borderRadius:15
  },
  descriptionform: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  formcontainer: {
    width: "100%",
    padding: 10,
  },
  NamesUser: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    columnGap:10
  },
  container_inputField:{
    width:"100%",
    height:height* 0.05,
    marginVertical:height *0.01

  },
  inputfield:{
     width:"100%" ,
     borderWidth:2,
     height:height*0.05,
     borderRadius:23,
     paddingHorizontal:12, 
     borderColor:"grey"
  },
  btn:{
    marginTop:12,
    backgroundColor:"black",
    height:height * 0.06,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
  }

});
export default UserRegistration;
