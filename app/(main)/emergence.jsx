import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigationbar from "../component/navigation";
import { ScrollView } from "react-native";
import UserProf from "../component/userprofile";
import MedicalButton from "../component/medicalbtn";

const Emergence = () => {
  return (
    <View style={emergencestyles.maincontainer}>
      {/* <View style={emergencestyles.mapcontainer}>
        <Text>Map view</Text>
      </View> */}
      <ScrollView>
        <View style={emergencestyles.emergenceprofile}>
          <View>
            <UserProf />
          </View>
        </View>
        <View style={emergencestyles.emergencesection}>
          <View style={emergencestyles.patientemergencyrec}>
            <Text>Heelo</Text>
          </View>
          <ScrollView>
            <View style={emergencestyles.patientservice}>
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
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};
const emergencestyles = StyleSheet.create({
  patientservice: {
    flexGrow: 1,
  },
  patientemergencyrec: {
    backgroundColor: "green",
    width: "73%",
    borderRadius: 12,
  },
  emergencesection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  emergenceprofile: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  // mapcontainer: {
  //   width:"50%"
  // },
  maincontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#eff5ec",
    paddingHorizontal: 1,
    paddingVertical: 34,
  },
});

export default Emergence;
