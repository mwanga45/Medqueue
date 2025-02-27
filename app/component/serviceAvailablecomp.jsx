import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Searchcomp from "../component/searchcomp"

const ServiceAvailablecomp = () => {
  return (
    <View style = {servicecomp.servcontainer}>
         <View style = {servicecomp.searchcompAva}></View>
         <View style = {servicecomp.Titlessrvice}><Text style={{color:"grey",fontSize:23,fontWeight:800}}>Service Available for booking</Text></View>
         <View style = {servicecomp.searchsevcomp}>
            <Searchcomp placeholder={"search for service"}/>
         </View>
    </View>
  );
}
const servicecomp = StyleSheet.create({
  searchsevcomp:{
     paddingHorizontal:12
  },
 Titlessrvice:{
  justifyContent:"center",
  alignItems:"center",
  marginBottom:12,
 },
 servcontainer:{
  backgroundColor:"rgba(0,0,0,0.2)",
  height:300,
  width:"100%",
 },
 searchcompAva:{
   paddingVertical:20
 }
})

export default ServiceAvailablecomp;
