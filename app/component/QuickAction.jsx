import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const QuickAction = ({backgroundColor, text , size , name, }) => {
  return (
    <View style ={[Quickstyles.Quickcontainer,{backgroundColor}]}>
          <Icon size ={size} name = {name}  style={{color:"white"}}/>
         <Text style={{color:"white"}}>{text}</Text>
    </View>
  );
}

export default QuickAction;

const Quickstyles = StyleSheet.create({
  Quickcontainer:{
    display:"flex",
    width:"100%",
    height:"10svh",
    padding:"12px",
    margin:"4px",
    color:"white",
    borderRadius:"15px",
    boxShadow:
    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",

  }
})