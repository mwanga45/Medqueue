import { StyleSheet, Image, Platform, View } from 'react-native';
import Dklistcard from "../component/doctorlistcard";




export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        <Dklistcard/>
    </View>
    )
  }
  const teststyle = StyleSheet.create({
    maintest:{
      marginTop:200,
      backgroundImage:"white",
      justifyContent:"center",
      alignItems:"center"
    }
  })