import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Searchcomp from "../component/searchcomp"

const ServiceAvailablecomp = () => {
  return (
    <View style = {servicecomp.servcontainer}>
         <View style = {servicecomp.searchcompAva}></View>
         <View>
            <Searchcomp/>
         </View>
    </View>
  );
}
const servicecomp = StyleSheet.create({
 servcontainer:{
  backgroundColor:"grey",
  height:300,
  width:"100%"
 }
})

export default ServiceAvailablecomp;
