import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Navigationbar from '../component/navigation';

const DoctorPresence = () => {
  return (
    
    <View style = {doctorsstyles.doctosMaincontainer}>
      <Text> hellow</Text>
      <Navigationbar/>
    </View>
  );
}
const doctorsstyles = StyleSheet.create({
  doctosMaincontainer:{
    flex:1,
    backgroundColor:"white"
   
  }
})
export default DoctorPresence;
