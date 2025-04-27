import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions} from 'react-native';
import axios from 'axios';
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';

const Servicelistcomp = () => {
      const [service, setservice] = useState<[]|any>([]);
    const handleGetService = async()=>{
        try{
         const res = await axios.get("http://192.168.110.251:8800/serviceAvailable")
         if (!res.data.success){
          Alert.alert(res.data.message)
         }
         const info = res.data
         setservice(info.data)
        }catch(err){
          Alert.alert("something went wrong")
          console.error(err)
        }
      }
  return (
    <GestureHandlerRootView style ={stylesmodal.container}>
      <View style={stylesmodal.headingpart}></View>
      <View style = {stylesmodal.searchpart}></View>
      <View style ={stylesmodal.listcontainer}></View>
    </GestureHandlerRootView>
  );
}
const {height} = Dimensions.get('window')
const stylesmodal = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:2
  },
  headingpart:{
   height: height *0.2,
   width:"100%",
   backgroundColor:"rgb(19, 243, 12)",
   justifyContent:"center",
   alignItems:"center"
  },
  searchpart:{
  
  },
  listcontainer:{

  }

})

export default Servicelistcomp;
