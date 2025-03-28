import React from 'react';
import { View, Text ,StyleSheet,Image} from 'react-native';

const Userdetails =() => {
  return (
    <View style={stylesdetails.Userdetailscontainer}>
    <View style = {stylesdetails.userprofile} >
        <Image source = {require("../../assets/images/favicon.png")}
            style={stylesdetails.image}/>
        <Text>LynxPrazo</Text>
    </View>
    </View>
  );
}
const stylesdetails = StyleSheet.create({
    Userdetailscontainer:{
        zIndex:100,
        position:"absolute",
        right:10,
        top:350,
        backgroundColor:"grey",
        width:"75%",
        borderRadius:6,
        justifyContent:"center",
        alignItems:"center"

    },
    userprofile:{
        flexDirection:"row",
        justifyContent:"start",
        alignItems:"center",
        paddingHorizontal:12,
        width:"100%",
        columnGap:12
    }

})
export default Userdetails
