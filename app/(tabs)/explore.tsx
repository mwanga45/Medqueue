import { StyleSheet, Image, Platform, View } from 'react-native';
import Dklistcard from "../component/doctorlistcard";
import Dktcard from "../component/doctorcard"
import Navigationbar from "../component/navigation"




export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        {/* <Dklistcard/> */}
        <Dktcard name={"Paul Solm"} specialist={"Therapist"}/>
        <Navigationbar/>
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