import React from 'react';
import { View, Text,StyleSheet, Image } from 'react-native';
import iconSet from '@expo/vector-icons/build/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';

const Dklistcard = () => {
  return (
    <View style= {styleslistcard.dklcontainer}>
         <View style = {styleslistcard.dkAgment}>
              <View style = {styleslistcard.imgdk}>
                <Image source={require("../../assets/images/react-logo.png")}  style= {{height:20, width:45}}/>
              </View>
              <View>
                <Text>Dr. Jenny Wilson</Text>
                <Text>Bone Health</Text>
                <Text>10:25AM - 11:25 AM Scheduled </Text>
              </View>
              <Ionicons name='chevron-right' size={20}></Ionicons>
              <View>
                  
              </View>
         </View>
    </View>
  );
}

const styleslistcard = StyleSheet.create({
    dklcontainer:{
        justifyContent:"center",
        alignItems:"center",
        height:70,
        backgroundColor:"white",
        padding:5,
        borderRadius:10
    },
    dkAgment:{
       flexDirection:"row",
       columnGap:12


    },
    imgdk:{
        backgroundColor:"grey",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10

    }
})

export default Dklistcard;
