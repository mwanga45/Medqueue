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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [username, setUsername] = useState("");
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
  const [forMe, setForMe] = useState<boolean>(true);
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

  const handlebookingsubmit = async () => {
    // If booking for someone else, show secret key modal
    if (!forMe) {
      setsecretemodal(true);
      return;
    }

    setmodalstatus(true);
    setbookingdata({
      servicerequested: selectedService?.servicename ?? "",
      Fromdate: selectedDate?.from ?? "",
      Todate: selectedDate?.to ?? "",
      appointmenttime: selectedTime,
      deviceId: deviceId,
      secretekey: SecreteKey,
    });
    
    // Prepare booking payload with forMe state
    const bookingPayload = {
      doctorId: selectedService?.id?.toString() ?? "",
      serviceId: selectedService?.id?.toString() ?? "",
      start_time: selectedTime.split(" - ")[0] ?? "",
      end_time: selectedTime.split(" - ")[1] ?? "",
      date: selectedDate?.from ?? "",
      dayofweek: "", 
      forme: forMe,
      specname: "", 
      speckey: "", 
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const res = await axios.post(
        apiurl + "booking/bookingreq", 
        bookingPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!res.data.success) {
        Alert.alert(res.data.message || "Something went wrong");
        return;
      }
      Alert.alert("Successfully placing a booking");
    } catch (err) {
      Alert.alert("Server Error ");
      console.error(err);
    }
  };
  useEffect(() => {
    // handleRespond();
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
            {/* ForMe Toggle Button */}
            <View style={stylesbooking.toggleContainer}>
              <Text style={stylesbooking.toggleLabel}>
                Booking for:
              </Text>
              <View style={stylesbooking.toggleButtonContainer}>
                <TouchableOpacity
                  style={[
                    stylesbooking.toggleButton,
                    forMe && stylesbooking.toggleButtonActive
                  ]}
                  onPress={() => setForMe(true)}
                >
                  <Text style={[
                    stylesbooking.toggleButtonText,
                    forMe && stylesbooking.toggleButtonTextActive
                  ]}>
                    For Me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    stylesbooking.toggleButton,
                    !forMe && stylesbooking.toggleButtonActive
                  ]}
                  onPress={() => setForMe(false)}
                >
                  <Text style={[
                    stylesbooking.toggleButtonText,
                    !forMe && stylesbooking.toggleButtonTextActive
                  ]}>
                    For Someone Else
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={stylesbooking.bookingpagedate}>
              <Icon name="calendar" size={20} style={{ color: "#f0f0f0" }} />
              <Text style={stylesbooking.textdiscription}>
                Select Date for the booking
              </Text>
              <View style={stylesbooking.dateslotecontainer}>
                {uniqueDates.map((date, index) => {
                  
                  const slotForDate = slotService?.find(slot => slot.date === date);
                  
                  const dayShort = slotForDate ? slotForDate.day_of_week.slice(0, 3) : '';
                  return (
                    <TouchableOpacity
                      key={index}
                      style={stylesbooking.dateslote}
                      onPress={() => setselectedDate({ from: date, to: date })}
                    >
                      <Text style={stylesbooking.dateslotecontent}>{date.split("-")[2]}</Text>
                      <Text style={stylesbooking.dateslotecontent}>{dayShort}</Text>
                    </TouchableOpacity>
                  );
                })}
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
          visible={secreteModal && !forMe}
          animationType="slide"
          onRequestClose={() => setsecretemodal(false)}
        >
          <View style={stylesbooking.secretestyles}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
              Book for Someone Else
            </Text>
            <View style={stylesbooking.secretInputcontainer}>
              <TextInput
                style={stylesbooking.styleInput}
                placeholder="Enter username"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={stylesbooking.secretInputcontainer}>
              <TextInput
                style={stylesbooking.styleInput}
                placeholder="Enter secret key"
                placeholderTextColor="#ccc"
                value={SecreteKey}
                onChangeText={setSecreteKey}
                secureTextEntry={true}
              />
            </View>
            <View style={stylesbooking.secretButtonContainer}>
              <TouchableOpacity
                style={stylesbooking.secretButton}
                onPress={async () => {
                  if (!username.trim()) {
                    Alert.alert("Please enter a username");
                    return;
                  }
                  if (!SecreteKey.trim()) {
                    Alert.alert("Please enter a secret key");
                    return;
                  }
                  
                  setsecretemodal(false);
                  // Proceed with booking for someone else
                  const bookingPayload = {
                    doctorId: selectedService?.id?.toString() ?? "",
                    serviceId: selectedService?.id?.toString() ?? "",
                    start_time: selectedTime.split(" - ")[0] ?? "",
                    end_time: selectedTime.split(" - ")[1] ?? "",
                    date: selectedDate?.from ?? "",
                    dayofweek: "", // This will be calculated on backend
                    forme: forMe,
                    specname: username.trim(),
                    speckey: SecreteKey,
                  };

                  try {
                    // Get token from AsyncStorage
                    const token = await AsyncStorage.getItem('userToken');
                    
                    const res = await axios.post(
                      apiurl + "booking/bookingreq", 
                      bookingPayload,
                      {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      }
                    );
                    
                    if (!res.data.success) {
                      Alert.alert(res.data.message || "Something went wrong");
                      return;
                    }
                    Alert.alert("Successfully placing a booking");
                    setSecreteKey("");
                    setUsername("");
                  } catch (err) {
                    Alert.alert("Server Error");
                    console.error(err);
                  }
                }}
              >
                <Text style={stylesbooking.secretButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[stylesbooking.secretButton, stylesbooking.cancelButton]}
                onPress={() => {
                  setsecretemodal(false);
                  setSecreteKey("");
                  setUsername("");
                }}
              >
                <Text style={stylesbooking.secretButtonText}>Cancel</Text>
              </TouchableOpacity>
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
    paddingHorizontal: 20,
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  toggleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  toggleButtonActive: {
    backgroundColor: "#007bff",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  toggleButtonTextActive: {
    color: "white",
  },
  secretButtonContainer: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 20,
  },
  secretButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007bff",
    borderRadius: 25,
    minWidth: 100,
    alignItems: "center",
  },
  secretButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
});
export default Booking;
