import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");
const Booking = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={stylesbooking.container}>
        <View style={stylesbooking.userprofile}></View>
        <View style={stylesbooking.bookingcontainer}>
          <View style={stylesbooking.bookingforcontainer}></View>
          <View style={stylesbooking.bookingpage}>
            <View style={stylesbooking.bookingpagedate}>
              <Icon name="calendar" size={20} style={{ color: "#f0f0f0" }} />
              <Text style={stylesbooking.textdiscription}>
                Select Date for the booking
              </Text>
              <View style={stylesbooking.dateslotecontainer}>
                <View style={stylesbooking.dateslote}>
                  <Text style={stylesbooking.dateslotecontent}>2</Text>
                  <Text style={stylesbooking.dateslotecontent}>Day</Text>
                </View>
                <View style={stylesbooking.dateslote}>
                  <Text style={stylesbooking.dateslotecontent}>3</Text>
                  <Text style={stylesbooking.dateslotecontent}>Day</Text>
                </View>
                <View style={stylesbooking.dateslote}>
                  <Text style={stylesbooking.dateslotecontent}>4</Text>
                  <Text style={stylesbooking.dateslotecontent}>Day</Text>
                </View>
                <View style={stylesbooking.dateslote}>
                  <Text style={stylesbooking.dateslotecontent}>5</Text>
                  <Text style={stylesbooking.dateslotecontent}>Day</Text>
                </View>
              </View>
            </View>
            <View style={stylesbooking.bookingpagetime}>
              <Text style={stylesbooking.textdiscription}>
                {" "}
                Select a time slot
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                persistentScrollbar={true}
                style={stylesbooking.scrollcontainer}
              >
                <TouchableOpacity>
                  <View style={[stylesbooking.slot]}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      12:30-12:40
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={[stylesbooking.slot]}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      12:30-12:40
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={[stylesbooking.slot]}>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      12:30-12:40
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={stylesbooking.bookingpageprice}>
              <View>
                <Text style={stylesbooking.textdiscription}>Price</Text>
                <Text style={{ color: "", fontSize: 28, fontWeight: "800" }}>
                  2500 Tsh
                </Text>
              </View>
              <View>
                <TouchableOpacity style={stylesbooking.bookngbtn}>
                  <Text
                    style={{ color: "#f0f0f0", fontSize: 18, fontWeight: 600 }}
                  >
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
const stylesbooking = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: "column",
    height: height,
    rowGap: height * 0.214,
    justifyContent: "center",
    alignItems: "center",
  },
  userprofile: {
    justifyContent: "space-between",
    backgroundColor: "blue",
    height: height * 0.08,
    width: width * 0.96,
  },
  bookingcontainer: {
    flexDirection: "column",
    height: height * 0.7,
    width: width * 0.96,
    rowGap: "5%",
    padding: 0,
  },
  bookingforcontainer: {
    flexDirection: "row",
    columnGap: 3,
    height: "10%",
  },
  bookingpage: {
    backgroundColor: "#f4f4f4",
    height: "84%",
    borderRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 10,
    rowGap: 40,
  },
  bookingpagedate: {
    width: "100%",
    flexDirection: "column",
    rowGap: 10,
  },
  bookingpagetime: {},
  bookingpageprice: {
    maxWidth: 300,
    flexDirection: "row",
    width: "100%",
    columnGap: width * 0.17,
  },
  textdiscription: {
    color: "grey",
    fontSize: 18,
    fontWeight: 500,
  },
  dateslote: {
    width: 80,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateslotecontainer: {
    flexDirection: "row",
    columnGap: width * 0.043,
  },
  slot: {
    width: 150,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    color: "white",
    marginTop: 10,
    marginHorizontal: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  scrollcontainer: {
    backgroundColor: "#F2F2F2",
    height: 80,
  },
  dateslotecontent: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    borderRadius: 500,
  },
  bookngbtn: {
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    backgroundColor: "rgba(0,0,0,0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Booking;
