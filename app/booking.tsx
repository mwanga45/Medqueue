import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { apiurl } from "./request_response";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  ScrollView,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import axios from "axios";
import { useRouter } from "expo-router";
import Servicelistcomp from "./component/servicelistcomp";
import { handlegetdeviceId } from "./request_response";
const { height, width } = Dimensions.get("window");
interface slotService {
  doctorId:number;
  doctorName:string;
  servicename:string;
  start_time:string;
  end_time:string;
  day_of_week:string;
  date:string;
  duration_minutes:string;
  fee:number;

}
const Booking = () => {
  const [deviceId, setdeviceId] = useState("");
  const [SecreteKey, setSecreteKey] = useState("");
  const [secreteModal, setsecretemodal] = useState<boolean>(true);
  const [slotService , setslotService] = useState<slotService[]|null>([]);
  const [selectedTime, setselectedTime] = useState<any>("");
  const [selectedDate, setselectedDate] = useState<any>({
    from: "",
    to: "",
  });
  const [selectedService, setSelectedService] = useState<{
    id: number;
    servicename: string;
    serviceprice: string;
  } | null>(null);
  const [modalstatus, setmodalstatus] = useState<boolean>(false);
  const [bookingdata, setbookingdata] = useState({
    servicerequested: "",
    Fromdate: "",
    Todate: "",
    appointmenttime: "",
    deviceId: "",
    secretekey: "",
  });
  const router = useRouter();

  // Extract unique dates from slotService
  const uniqueDates = Array.from(
    new Set(slotService?.map((slot) => slot.date))
  );

  // Filter slots for selected date
  const filteredSlots = slotService?.filter(
    (slot) => slot.date === selectedDate.from
  );

  const handleRespond = async () => {
    try {
      const res = await axios.get(apiurl+"booking/serviceslot")
      if (!res.data.success) {
        Alert.alert(res.data.message || "Something went wrong");
      }
      setslotService(res.data.result);
    } catch (err: any) {
      Alert.alert("Something went wrong");
      console.error(err);
    }
  };
  const handlebookingsubmit = async () => {
    setmodalstatus(true);
    setbookingdata({
      servicerequested: selectedService?.servicename ?? "",
      Fromdate: selectedDate?.from ?? "",
      Todate: selectedDate?.to ?? "",
      appointmenttime: selectedTime,
      deviceId: deviceId,
      secretekey: SecreteKey,
    });
    try {
      const res = await axios.post(apiurl + "bookingrequest", bookingdata);
      if (!res.data.success) {
        Alert.alert(res.data.message || "Something went wrong");
        return;
      }
      Alert.alert("Successfully placing  a booking");
    } catch (err) {
      Alert.alert("Server Error ");
      console.error(err);
    }
  };
  useEffect(() => {
    handleRespond();
    const initilize = async () => {
      await handlegetdeviceId(apiurl, deviceId, setdeviceId);
    };
    initilize();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={stylesbooking.container}>
        <View style={stylesbooking.userprofile}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={stylesbooking.backButton}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={stylesbooking.profileview}>
            <TouchableOpacity
              style={stylesbooking.imageprofile}
              onPress={() => setmodalstatus(true)}
            >
              <Icon name="toolbox" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesbooking.bookingcontainer}>
          <View style={stylesbooking.bookingforcontainer}>
            {selectedService && (
              <View style={stylesbooking.listofbooking}>
                <Text
                  style={{ color: "black", fontSize: 22, fontWeight: "600" }}
                >
                  You picked:
                </Text>
                <Text style={stylesbooking.textdiscription1}>
                  {selectedService.servicename}
                </Text>
                <Text style={stylesbooking.textdiscription1}>
                  Time: {selectedTime}
                </Text>
                <Text style={stylesbooking.textdiscription1}>
                  From: {selectedDate.from} To: {selectedDate.to}
                </Text>
              </View>
            )}
          </View>
          <View style={stylesbooking.bookingpage}>
            <View style={stylesbooking.bookingpagedate}>
              <Icon name="calendar" size={20} style={{ color: "#f0f0f0" }} />
              <Text style={stylesbooking.textdiscription}>
                Select Date for the booking
              </Text>
              <View style={stylesbooking.dateslotecontainer}>
                {uniqueDates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={stylesbooking.dateslote}
                    onPress={() => setselectedDate({ from: date, to: date })}
                  >
                    <Text style={stylesbooking.dateslotecontent}>{date}</Text>
                    <Text style={stylesbooking.dateslotecontent}>Date</Text>
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
                {filteredSlots && filteredSlots.length > 0 ? (
                  filteredSlots.map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setselectedTime(slot.start_time + " - " + slot.end_time)}
                    >
                      <View style={[stylesbooking.slot]}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          {slot.start_time} - {slot.end_time}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={{ color: "grey", fontSize: 16, margin: 10 }}>
                    No slots available for this date
                  </Text>
                )}
              </ScrollView>
            </View>
            <View style={stylesbooking.bookingpageprice}>
              <View>
                <Text style={stylesbooking.textdiscription}>Service Price</Text>
                <Text style={{ color: "", fontSize: 28, fontWeight: "800" }}>
                  {selectedService?.serviceprice}.Sh
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={stylesbooking.bookngbtn}
                  onPress={handlebookingsubmit}
                >
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
        <Modal
          visible={modalstatus}
          animationType="slide"
          onRequestClose={() => setmodalstatus(false)}
        >
          <Servicelistcomp
            setModal={setmodalstatus}
            onSelect={setSelectedService}
            setSlot = {setslotService}
          />
        </Modal>
        <Modal
          visible={false}
          animationType="slide"
          onRequestClose={() => setmodalstatus(false)}
        >
          <View style={stylesbooking.secretestyles}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
              Please Enter Secrete Key
            </Text>
            <View style={stylesbooking.secretInputcontainer}>
              <TextInput
                style={stylesbooking.styleInput}
                placeholder="fill secrete key"
              />
            </View>
          </View>
        </Modal>
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
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: height * 0.08,
    width: "100%",
    flexDirection: "row",
    borderRadius: 23,
  },
  backButton: {
    padding: 8,
  },
  profileview: {
    padding: 8,
  },
  imageprofile: {
    width: 60,
    height: 60,
    backgroundColor: "#012107",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
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
  btnModalopen: {
    width: 50,
    height: 50,
    backgroundColor: "black",
  },
  listofbooking: {
    width: "100%",
    height: height,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
  },
  bookingpage: {
    backgroundColor: "#f4f4f4",
    height: "75%",
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    top: 35,
    rowGap: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  bookingpagedate: {
    width: "100%",
    flexDirection: "column",
    rowGap: 10,
  },
  bookingpagetime: {},
  bookingpageprice: {
    flexDirection: "row",
    width: "100%",
    columnGap: width * 0.17,
  },
  textdiscription: {
    color: "grey",
    fontSize: 18,
    fontWeight: 500,
  },
  textdiscription1: {
    color: "#f0f0f0",
    fontSize: 18,
    fontWeight: 500,
  },
  dateslote: {
    width: 80,
    height: 100,
    backgroundColor: "#383838",
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
    backgroundColor: "#D4D4D4",
    height: 80,
  },
  dateslotecontent: {
    color: "#f0f0f0",
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
  secretestyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
    backgroundColor: "rgb(0, 103, 171)",
    rowGap: 20,
  },
  secretInputcontainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  styleInput: {
    width: "80%",
    height: 45,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "blue",
    paddingHorizontal: 20,
    backgroundColor: "grey",
    color: "white",
  },
});
export default Booking;
