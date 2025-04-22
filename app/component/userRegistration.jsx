import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserRegistration = () => {
  return (
    <SafeAreaView style={stylesform.container}>

    </SafeAreaView>
  );
}
const stylesform = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10,
    borderColor:"grey",
    borderWidth:5,
    width:"100%"
  }
})
export default UserRegistration;
