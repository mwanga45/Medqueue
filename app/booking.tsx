import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView , GestureHandlerRootView} from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");
const Booking = () => {
  return (
    <GestureHandlerRootView style ={{flex:1}}>
    <SafeAreaView style={stylesbooking.container}>
      <View style={stylesbooking.userprofile}></View>
      <View style={stylesbooking.bookingcontainer}>
        <View style={stylesbooking.bookingforcontainer}></View>
        <View style={stylesbooking.bookingpage}>
          <View style={stylesbooking.bookingpagedate}>
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
            <Text style={stylesbooking.textdiscription}> Select a time slot</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator= {true} persistentScrollbar={true}>

            </ScrollView>
          </View>
          <View style={stylesbooking.bookingpageprice}></View>
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
    rowGap:40,
  },
  bookingpagedate: {
    width: "100%",
    flexDirection: "column",
    rowGap:10,
  },
  bookingpagetime: {

  },
  bookingpageprice: {},
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
  },
  dateslotecontainer: {
    flexDirection: "row",
    columnGap: width * 0.043,
  },
  dateslotecontent: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});

export default Booking;
