import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import QuickAction from "../component/QuickAction";
import MyCalendar from "../component/calender";
import Navigationbar from "../component/navigation";
import { useNavigation, useRouter } from "expo-router";

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const Homepage = () => {
  const router = useRouter()
  const [showcalender, setshowcalender] = useState(false);
  const handleshowcalender = () => {
    setshowcalender(!showcalender);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.HomepageContainer}>
          <View style={styles.Homepagecover1}>
            <Icon name="hospital-symbol" size={100} style={{ color: "silver" }} />
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
                onclick={()=>router.push("booking")}
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
          {showcalender && <MyCalendar />}
        </View>
      </ScrollView>

      {/* Fixed Navigation Bar */}
      <Navigationbar />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen height
    backgroundColor: "#F7F7F7",
  },
  scrollContainer: {
    flexGrow: 1, //this allow the scrollview content to expand to fill the content 
    paddingBottom: 80, 
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
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    borderRadius:45,
    marginTop:1,
    height: 300,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#275f38",
    shadowColor: "rgba(0, 0, 0, 0.17)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  TextQuick: {
    fontSize: 25,
    fontWeight: "900",
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
