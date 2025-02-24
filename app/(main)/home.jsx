import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import QuickAction from "../component/QuickAction";
import MyCalendar from "../component/calender";
import Dktcard from "../component/doctorcard";
import { View, Text, StyleSheet,Dimensions, ScrollView, TouchableOpacity } from "react-native";

const Homepage = () => {
  const [showcalender, setshowcalender] = useState(false)
  const handleshowcalender = ()=>{
    setshowcalender(!showcalender)
  }
  return (
    <ScrollView style ={styles.Scrollstyle}>
      <View style={styles.HomepageContainer}>
        <View style={styles.Homepagecover1}>
          <Icon
            name="hospital-symbol"
            size={100}
            style={{ color: "silver" }}
          ></Icon>
        </View>
        <Text style={styles.TextQuick}>Quick Action</Text>
        <View style={styles.Homepagecover2}>
          <View style={{ flex: 1, padding: 10 }}>
            <QuickAction
              name={"bell"}
              size={30}
              text={"Set Remainder"}
              backgroundColor={"#274b5f"}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <QuickAction
              name={"book"}
              size={30}
              text={"Booking"}
              backgroundColor={"#00d4ff"}
            />
          </View>
        </View>
        <View style={styles.Homepagecover2}>
          <View style={{ flex: 1, padding: 10 }}>
            <QuickAction
              name={"calendar-day"}
              size={30}
              text={"calender"}
              backgroundColor={"#274b5f"}
              onclick={handleshowcalender}
      
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <QuickAction
              name={"user-check"}
              size={30}
              text={"Doctor Available"}
              backgroundColor={"#d51341"}
            />
          </View> 
        </View>
        {
          showcalender && <MyCalendar/>   
        }
      </View>
      
    </ScrollView>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  Scrollstyle:{
    backgroundColor: "#F7F7F7",
  },
  HomepageContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingLeft: 1.5,
    paddingRight: 2,
    paddingBottom: 1,
  },
  Homepagecover1: {
    position: "relative",
    justifyContent: "center",
    borderBottomLeftRadius: "45px",
    borderBottomRightRadius: "45px",
    height: 200,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#275f38",
    shadowColor: "rgba(0, 0, 0, 0.17)",
    shadowOffset: { width: 0, height: 4 }, // X and Y shadow position
    shadowOpacity: 0.3, // Darkness of shadow
    shadowRadius: 5, // Blur effect
    zIndex: 100,
  },
  TextQuick: {
    fontSize: 25,
    fontWeight: 900,
    margin: 12,
    color: "silver",
  },
  Homepagecover2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
});
