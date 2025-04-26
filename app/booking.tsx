import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import axios from "axios";
const { height, width } = Dimensions.get("window");
const Booking = () => {
  const [TsSlot, setTsSlot] = useState<[] | any>([]);
  const [DsSlot, setDsSlot] = useState<[] | any>([]);
  const [respond, setRespond] = useState<any>([]);
  const handleRespond = async () => {
    try {
      const res = await axios.get("http://192.168.110.251:8800/bookinglogic");
      if (!res.data.success) {
        Alert.alert(res.data.message || "Something went wrong");
      }
      setDsSlot(res.data.dslot);
      setTsSlot(res.data.tslot);
    } catch (err: any) {
      Alert.alert("Something went wrong");
      console.error(err);
    }
  };
  useEffect(() => {
    handleRespond();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={stylesbooking.container}>
        <View style={stylesbooking.userprofile}>
          <Text style={{ color: "white" }}></Text>
        </View>
        <View style={stylesbooking.bookingcontainer}>
          <View style={stylesbooking.bookingforcontainer}></View>
          <View style={stylesbooking.bookingpage}>
            <View style={stylesbooking.bookingpagedate}>
              <Icon name="calendar" size={20} style={{ color: "#f0f0f0" }} />
              <Text style={stylesbooking.textdiscription}>
                Select Date for the booking
              </Text>
              <View style={stylesbooking.dateslotecontainer}>
                {DsSlot.map((day: any, index: number) => (
                  <TouchableOpacity key={index} style={stylesbooking.dateslote}>
                    <Text style={stylesbooking.dateslotecontent}>
                      {day.From}
                    </Text>
                    <Text style={stylesbooking.dateslotecontent}>{day.To}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={stylesbooking.bookingpagetime}>
              <Text style={stylesbooking.textdiscription}>
                Select a time slot
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                persistentScrollbar={true}
                style={stylesbooking.scrollcontainer}
              >
                {TsSlot.map((slot: any, index: number)=>{
                  // const [timeslote] =  timeArr;
                  return(
                    <TouchableOpacity key={index}>
                    <View style={[stylesbooking.slot]}>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {slot.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  )
                })}

                {/* <TouchableOpacity>
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
                </TouchableOpacity> */}
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
    height: "75%",
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    top: 35,
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
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
