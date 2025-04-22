import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserRegistration = () => {
  return (
    <SafeAreaView style={stylesform.container}>
        <View style={stylesform.descriptionform}>
        <Text style={{fontSize:29, color:"#454345", fontWeight:800}}>Get Started Now </Text>
        <Text style={{fontSize:16, color:"grey", fontWeight:"400"}}>Create an Account to get Full access of our service</Text>
        </View>
        <View style={stylesform.formcontainer}>

        </View>
    </SafeAreaView>
  );
}
const stylesform = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    borderColor:"grey",
    borderWidth:5,
    width:"100%"
  },
  descriptionform:{
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    flexDirection:"column"
  },
  formcontainer:{
    
  }

})
export default UserRegistration;
