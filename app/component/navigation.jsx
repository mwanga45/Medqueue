import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navigationbar = () => {
  return (
    <View style= {navstyles.navcontainer}>
      <View style = {navstyles.mainnavcontainer}>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      </View>
    </View>
  );
}
 const navstyles = StyleSheet.create({
    navcontainer:{
    //    backgroundColor:"rgba(0, 0, 0, 0.2)",
       width:"100%",
       paddingHorizontal:12,
       height:40,
       justifyContent:"center",
       position:"relative",
       top:300


   
    },
    mainnavcontainer:{
       alignItems:"center",
       height:40,
       justifyContent:"space-between",
       flexDirection:"row", 
       backgroundColor:"rgba(23, 22, 22, 0.9)",  
       borderRadius:12
    },
    

 })


export default Navigationbar;
