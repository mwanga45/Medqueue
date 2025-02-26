import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Navigationbar from "../component/navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserProf from "../component/userprofile";
import Searchcomp from "../component/searchcomp";
import Dklistcard from "../component/doctorlistcard";

const DoctorPresence = () => {
  const currentdate = new Date();
  const year = currentdate.getFullYear();
  const day = currentdate.toLocaleString("en-us", { weekday: "short" });
  const monthname = currentdate.toLocaleString("default", { month: "short" });
  const month = currentdate.getMonth();
  const formated = `${day}, ${month} ${monthname} ${year}`;
  return (
    <View style={doctorsstyles.doctosMaincontainer}>
      <ScrollView style = {doctorsstyles.scrollcontainer}>
      <View style={doctorsstyles.usercontent}>
        <View style={doctorsstyles.datebell}>
          <Text style={doctorsstyles.datestyle}>{formated}</Text>
          <Icon name="bell" size={20} />
        </View>
        <View style={doctorsstyles.propfile}>
          <UserProf />
        </View>
        <View style={doctorsstyles.searchdoctor}>
          <Searchcomp />
        </View>
      </View>
      <View style={doctorsstyles.doclist}>
        <View >
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
          <Dklistcard />
        </View>
      </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};
const doctorsstyles = StyleSheet.create({
  scrollcontainer:{
     flexGrow:1,

  },
 
  doclist: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 23,
  },
  searchdoctor: {
    width: "98%",
    marginTop: 12,
  },
  propfile: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "96%",
  },
  datestyle: {
    fontSize: 18,
    color: "grey",
    fontWeight: "800",
  },
  datebell: {
    width: "90%",
    justifyContent: "space-between",
    //  backgroundColor:"black"
    flexDirection: "row",
  },
  doctosMaincontainer: {
    flex: 1,
    backgroundColor: "#d3d2d2",
    paddingBottom:80
  },
  usercontent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 270,
    backgroundColor: "#eff5ec",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop:34,

  },
});
export default DoctorPresence;
