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
            <Text>Heelo</Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={emergencestyles.patientservice}
            >
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
              <MedicalButton />
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
    paddingVertical: 14,
  },
  patientemergencyrec: {
    backgroundColor: "green",
    width: "73%",
    borderRadius: 12,
    position:"relative"
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