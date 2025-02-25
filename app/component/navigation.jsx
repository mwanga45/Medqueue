import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/FontAwesome5";

const Navigationbar = () => {
  const router = useRouter()
  const handlenavigation = ()=>{
      router.replace("/(tabs)/explore")
  }
  return (
    <View style= {navstyles.navcontainer}>
      <View style = {navstyles.mainnavcontainer}>
        <TouchableOpacity >
      <Text style= {{color:"white"}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Icon name= "home" ></Icon>
      <Text style= {{color:"white"}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handlenavigation}>
      <Text style= {{color:"white"}}>export</Text>
        </TouchableOpacity>

    
      </View>
    </View>
  );
}
 const navstyles = StyleSheet.create({
    navcontainer:{
    //    backgroundColor:"rgba(0, 0, 0, 0.2)",
       width:"100%",
       paddingHorizontal:12,
       height:60,
       justifyContent:"center",
       position:"relative",
       top:281


   
    },
    mainnavcontainer:{
       alignItems:"center",
       height:60,
       justifyContent:"space-between",
       flexDirection:"row", 
       backgroundColor:"rgba(23, 22, 22, 0.9)",  
       borderRadius:12,
       paddingHorizontal:12,
    },
    

 })


export default Navigationbar;
