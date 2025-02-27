import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Searchcomp from "../component/searchcomp"
import { Picker } from '@react-native-picker/picker';

const ServiceAvailablecomp = () => {
const [dropvalue, setdropvalue] = useState("position1")
  return (
    <View style = {servicecomp.servcontainer}>
         <View style = {servicecomp.searchcompAva}></View>
         <View style = {servicecomp.Titlessrvice}><Text style={{color:"white",fontSize:23,fontWeight:800}}>Service Available for booking</Text></View>
         <View style = {servicecomp.searchsevcomp}>
            <Searchcomp placeholder={"search for service"}/>
         </View>
         <View style ={servicecomp.pickercontainer}>
          <Picker onValueChange={(index, positon) => setdropvalue(positon)} selectedValue={dropvalue} style= {servicecomp.pickersev}>
            <Picker.Item label='choose service ' value="position1"/>
            <Picker.Item label='service2' value="position2"/>
            <Picker.Item label='service3' value="position3"/>
            <Picker.Item label='service4' value="position4"/>
          </Picker>
         </View>
    </View>
  );
}
const servicecomp = StyleSheet.create({
  pickersev:{
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    marginHorizontal:12
  },
  pickercontainer:{
    // backgroundColor:"white",
  },
  searchsevcomp:{
     paddingHorizontal:12,
     marginBottom:8,
  },
 Titlessrvice:{
  justifyContent:"center",
  alignItems:"center",
  marginBottom:12,
 },
 servcontainer:{
  backgroundColor:"rgba(0,0,0,0.2)",
  height:300,
  width:"90%",
  borderRadius:12,
  marginBottom:12
 },
 searchcompAva:{
   paddingVertical:20,

 }
})

export default ServiceAvailablecomp;
