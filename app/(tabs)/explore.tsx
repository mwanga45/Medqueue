import { StyleSheet, Image, Platform, View } from 'react-native';
import Dktcard from "../component/doctorcard";



export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        <Dktcard specialist={"Neurologist"} name={"Mandari"}/>
    </View>
    )
  }
  const teststyle = StyleSheet.create({
    maintest:{
      backgroundImage:"white",
      justifyContent:"center",
      alignContent:"center"
    }
  })