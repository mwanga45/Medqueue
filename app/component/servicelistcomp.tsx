import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions} from 'react-native';
import axios from 'axios';
import { ScrollView,GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

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
      useEffect(()=>{
        // handleGetService()
      },[])
  return (
    <GestureHandlerRootView style ={stylesmodal.container}>
      <View style={stylesmodal.headingpart}>
        <Text style={stylesmodal.texttitle}>Here are the List of our Service</Text>
      </View>
      <View style = {stylesmodal.searchpart}>
        <View style = {stylesmodal.textinputcontainer}>
            <TextInput/>
        </View>
      </View>
      <View style ={stylesmodal.listcontainer}></View>
    </GestureHandlerRootView>
  );
}
const {height} = Dimensions.get('window')
const stylesmodal = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:4
  },
  headingpart:{
   height: height *0.2,
   width:"100%",
   backgroundColor:"rgb(19, 243, 12)",
   justifyContent:"center",
   alignItems:"center"
  },
  searchpart:{
   justifyContent:"center",
   alignItems:"center",
   height:height *0.08,
   width:"100%",
   backgroundColor:"red",
   marginTop:height *0.02
  },
  listcontainer:{
    height:height *0.67,
    width:"100%",
    backgroundColor:"grey",
    marginTop:height * 0.02

  },
  texttitle:{
    fontSize:20,
    fontWeight:"800",
    color:"white"
  },
  textinputcontainer:{
   backgroundColor:"white",
   width:"90%",
   height:50,
   


  }

})

export default Servicelistcomp;
