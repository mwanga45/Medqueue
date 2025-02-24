import { StyleSheet, Image, Platform, View } from 'react-native';
import Dktcard from "../component/doctorcard";



export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        <Dktcard specialist={"Neurologist"} name={"Paul solm"}/>
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