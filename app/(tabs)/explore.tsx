import { StyleSheet, Image, Platform, View } from 'react-native';
import Dklistcard from "../component/doctorlistcard";
import Dktcard from "../component/doctorcard"




export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        {/* <Dklistcard/> */}
        <Dktcard name={"Paul Solm"} specialist={"health"}/>
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