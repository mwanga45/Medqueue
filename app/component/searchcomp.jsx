import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"


const Searchcomp = () => {
  return (
    <View>
      <View style = {searchstyles.searchcontainer}>
         <TextInput  style= {searchstyles.inputsearchstyles} placeholder="search for doctor"/>
         <Icon name="search" size={20}/>
      </View>
    </View>
  );
};
const searchstyles = StyleSheet.create({
    searchcontainer:{
        width:"100%",
        justifyContent:"space-evenly",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#e1e1e1",
        height:60,
        borderRadius:23

        // backgroundColor:"black"
    },
    inputsearchstyles:{
        width:"85%",
    }
});


export default Searchcomp;
