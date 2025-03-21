import React, { useEffect, useState } from "react";
import axios from "axios"
import { View, Text, ScrollView, StyleSheet, Image, FlatList, Alert } from "react-native";
import Navigationbar from "../component/navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserProf from "../component/userprofile";
import Searchcomp from "../component/searchcomp";
import Dklistcard from "../component/doctorlistcard";

const DoctorPresence = () => {
  const [doctorinfo, setdoctorinfo]= useState([])
  const handledoctorsinfo = async () => {
    try {
      const response = await axios.get("http://192.168.139.251:8800/doctorinfo");
      const info = response.data;
      if (info.success) {
        setdoctorinfo(info.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      Alert.alert("Please information isn’t available");
    }
  };
  
  useEffect(()=>{
  handledoctorsinfo()
  },[])
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={doctorsstyles.doctosMaincontainer}>
      <ScrollView 
        style={doctorsstyles.scrollcontainer}
        contentContainerStyle={doctorsstyles.scrollContent}
      >
        <View style={doctorsstyles.usercontent}>
          <View style={doctorsstyles.headerContainer}>
            <Text style={doctorsstyles.dateText}>{formattedDate}</Text>
            <Icon name="bell" size={20} color="#666666" />
          </View>
          
          <View style={doctorsstyles.profileContainer}>
            <UserProf />
          </View>
          
          <View style={doctorsstyles.searchContainer}>
            <Searchcomp />
          </View>
        </View>

        <View style={doctorsstyles.listContainer}>
          <FlatList
            // data={Array(40).fill({})}
            data={doctorinfo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Dklistcard 
                dkt_Name={item.full_name} 
                time={item.availability} 
                Specialist={item. specialty}
              />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={7}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <Navigationbar />
    </View>
  );
};

const doctorsstyles = StyleSheet.create({
  doctosMaincontainer: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    position: "relative",
  
  },
  scrollcontainer: {
    flex: 1,
    zIndex: 1,
    marginBottom:82

  },
  scrollContent: {
    paddingBottom: 100,
  },
  usercontent: {
    backgroundColor: "#f0f7ed",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4a4a",
    letterSpacing: 0.3,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    marginBottom: 16,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});

export default DoctorPresence;