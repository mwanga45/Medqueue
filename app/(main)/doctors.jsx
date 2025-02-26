import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Navigationbar from "../component/navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserProf from "../component/userprofile";

const DoctorPresence = () => {
  const currentdate = new Date();
  const year = currentdate.getFullYear();
  const day = currentdate.toLocaleString("en-us", { weekday: "short" });
  const monthname = currentdate.toLocaleString("default", { month: "short" });
  const month = currentdate.getMonth();
  const formated = `${day}, ${month} ${monthname} ${year}`;
  return (
    <View style={doctorsstyles.doctosMaincontainer}>
      <View style={doctorsstyles.usercontent}>
        <View style={doctorsstyles.datebell}>
          <Text style= {doctorsstyles.datestyle}>{formated}</Text>
          <Icon name="bell" size={20} />
        </View>
        <View style = {doctorsstyles.propfile}>
            <UserProf/>
        </View>
        <View style = {doctorsstyles.searchdoctor}>
           
        </View>
      </View>
      <Navigationbar />
    </View>
  );
};
const doctorsstyles = StyleSheet.create({
  searchdoctor:{

  },
  propfile:{
     justifyContent:"center",
     alignItems:"center",
     flexDirection:"row",
     width:"96%"

  },
  datestyle:{
    fontSize:18,
    color:"grey",
    fontWeight:"800"
  },
  datebell: {
    width: "90%",
    justifyContent: "space-between",
    //  backgroundColor:"black"
    flexDirection:'row',
    
  },
  doctosMaincontainer: {
    flex: 1,
    backgroundColor: "#d3d2d2",
  },
  usercontent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "200",
    // paddingTop:14,
  },
});
export default DoctorPresence;
