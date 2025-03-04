import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";
import { ScrollView } from "react-native";
import UserProf from "../component/userprofile";
import MedicalButton from "../component/medicalbtn";

const Emergence = () => {
  return (
    <View style={emergencestyles.maincontainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={emergencestyles.emergenceprofile}>
          <UserProf />
        </View>
        
        <View style={emergencestyles.emergencesection}>
          <View style={emergencestyles.patientemergencyrec}>
            <View>
               
            </View>
            <View>

            </View>
            <View>

            </View>
          </View>
          
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={emergencestyles.patientservice}
            >
            {
              Array.from({length:40}).map((_,index)=>(
                <MedicalButton/>
              ))
            }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};

const emergencestyles = StyleSheet.create({
  patientservice: {
    position:"absolute",
    right:0,
    backgroundColor:"rgba(175, 185, 185, 0.2)",
    width:102,
    borderRadius:12,
  },
  patientemergencyrec: {
    width: "73%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 12,
    position: "absolute", 
    top:12,           
    left: 0,
    right: 0,
    backgroundColor:"rgba(199, 248, 248, 0.2)",

  },
  emergencesection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    flex: 1,
  },
  emergenceprofile: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "#eff5ec",
    paddingVertical: 34,
  },
});

export default Emergence;