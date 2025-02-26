import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/FontAwesome5";


const Navigationbar = () => {
  const router = useRouter()

  return (
    <View style= {navstyles.navcontainer}>
       <View style = {navstyles.mainnavcontainer}>
        <TouchableOpacity style= {navstyles.link}  onPress={()=> router.replace("/(main)/home")}>
          <Icon name= "home"  ></Icon>
      <Text style= {{color:"white"}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {navstyles.link} onPress={()=> router.replace("/(tabs)/explore")} >
          <Icon name= "home"  ></Icon>
      <Text style= {{color:"white"}}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {navstyles.link} onPress={() => router.replace("/(main)/doctors")} >
          <Icon name= "list"   ></Icon>
      <Text style= {{color:"white"}}>doctors</Text>
        </TouchableOpacity>



    
      </View> 
    </View>
  );
}
const navstyles = StyleSheet.create({
  navcontainer: {
     flex:1,
     width: "100%",
     position: "absolute",  // Fix the position
     bottom: 0,             // Stick it to the bottom
     left: 0,
     right: 0,
     justifyContent: "center",
  },
  mainnavcontainer: {
     alignItems: "center",
     height: 80,
     justifyContent: "space-between",
     flexDirection: "row", 
     backgroundColor: "rgba(23, 22, 22, 0.9)",  
     borderRadius: 12,
     paddingHorizontal: 22,
  },
  link: {
     backgroundColor: "#9aef6a",
     justifyContent: "center",
     alignItems: "center",
     width: 60,
     height: 50,
     borderRadius: 15,
  }
});


export default Navigationbar;
