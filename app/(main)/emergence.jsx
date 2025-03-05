import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import Navigationbar from "../component/navigation";
import { ScrollView } from "react-native";
import UserProf from "../component/userprofile";
import MedicalButton from "../component/medicalbtn";

const Emergence = () => {
  return (
    <View style={emergencestyles.maincontainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={emergencestyles.emergenceprofile}>
          <UserProf  Age={26}/>
        </View>
        
        <View style={emergencestyles.emergencesection}>
          <View style={emergencestyles.patientemergencyrec}>
            <View style={emergencestyles.transportmeans}>
               <Text style = {emergencestyles.transporttitle}>Choose Transport means </Text>
               <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} persistentScrollbar={true} >                
               <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ paddingVertical: 12 }}
              >
                {[1, 2, 3].map((_, index) => (
                  <View key={index} style={emergencestyles.costandmeans}>
                    <View style={emergencestyles.imagecontainer}>
                      <Image
                        source={require("../../assets/images/adaptive-icon.png")}
                        style={emergencestyles.image}
                      />
                    </View>
                    <View style={emergencestyles.innercontainer}>
                      <Text style={emergencestyles.cost}>helicopter</Text>
                      <Text style={emergencestyles.cost}>cost 0$</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
               </ScrollView>
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
                <MedicalButton key={index}/>
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
  cost:{
   fontWeight:400,
   fontSize:18,
  color:"grey"
  },
  innercontainer:{
   justifyContent:"space-around",
   alignItems:"center",
   flexDirection:"row"
  },
  costandmeans:{
   backgroundColor:"white",
   borderRadius:22,
   marginVertical:12,
   paddingVertical:8,
   paddingHorizontal:8,
   marginHorizontal:12,
  },
  transporttitle:{
    fontSize:20,
    fontWeight:600,
  },
  imagecontainer:{
   justifyContent:"center",
   alignItems:"center",
   backgroundColor:"rgba(236, 236, 236, 0.2)",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  transportmeans: {
    minHeight: 200, // Ensure minimum height for transport section
    width: '100%',
  },
  patientserviceContainer: {
    flex: 1,
    marginLeft: 8,
    maxWidth: 102,
  },
  patientserviceContent: {
    paddingVertical: 8,
  },
  patientemergencyrec: {
    width: "73%",
    borderRadius: 12,
    backgroundColor: "rgba(199, 248, 248, 0.2)",
    marginVertical: 12,
  },
  emergencesection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 12,
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