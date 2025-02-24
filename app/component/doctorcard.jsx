import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Dktcard = ({specialist,name}) => {
  return (
    <LinearGradient
    colors={["rgba(0,36,2,1)", "rgba(19,213,84,1)", "rgba(3,234,25,1)"]}
    start={{ x: 0.2, y: 0 }}
    end={{ x: 1, y: 1 }}
    style= {stylescard.Cardcontainer}
  >
    <View>
        <View style= {stylescard.handlespecialist}>
       <Text style= {stylescard.Specialist}>{specialist}</Text>     
        </View>
        <View style = {stylescard.handlename}>
            <Text style={stylescard.dktname}>Dr.{name}</Text>
        </View>
    </View>
    </LinearGradient>
  );
}

const stylescard = StyleSheet.create({
    Cardcontainer:{
        flex:1,
        backgroundColor:"#d0f0c0",
        width: "95%",
        padding:12,
        borderRadius:15


    },
    handlespecialist:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.2)",
        width:"20%",
        borderRadius:4,
        marginBottom:12
    },
    handlename:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"40%",
        borderRadius:4,
        paddingBottom:12,
    },

    dktname:{
       color:"white",
       fontSize:20,
    },
    Specialist:{
       color:"white",
       fontSize:10,
    }
})

export default Dktcard;
