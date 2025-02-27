import { StyleSheet, Image, Platform, View } from 'react-native';
import Dklistcard from "../component/doctorlistcard";
import Dktcard from "../component/doctorcard"
import Navigationbar from "../component/navigation"
import ServiceAvailablecomp from "../component/serviceAvailablecomp"




export default function TabTwoScreen() {
  return (
    <View style= {teststyle.maintest}>
        {/* <Dklistcard/> */}
        {/* <Dktcard name={"Paul Solm"} specialist={"Therapist"}/> */}
        <ServiceAvailablecomp/>
        <Navigationbar/>
    </View>
    )
  }
  const teststyle = StyleSheet.create({
    maintest:{
      flex:1,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center"
    }
  })