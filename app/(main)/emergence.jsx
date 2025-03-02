import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigationbar from '../component/navigation';

const Emergence = () => {
  return (
    <View style = {emergencestyles.maincontainer} >
      <View>
        
      </View>
      <View></View>
      <Navigationbar/>
    </View>
  );
}
const emergencestyles = StyleSheet.create({
    maincontainer:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor:"white"
    }
})

export default Emergence;
