import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  useWindowDimensions,
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

// Get initial dimensions
const { height: initialHeight, width: initialWidth } = Dimensions.get("window");

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
  // Use responsive dimensions
  const { height, width } = useWindowDimensions();
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
  const [selectedSlot, setSelectedSlot] = useState<slotService | null>(null);
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

  // Calculate responsive values
  const responsiveHeight = height || initialHeight;
  const responsiveWidth = width || initialWidth;
  
  // Responsive scaling factors - adjusted to ensure minimum visibility
  const scaleFactor = Math.min(responsiveWidth / 375, responsiveHeight / 812); // Base on iPhone X dimensions
  const scaledFontSize = (size: number) => Math.max(size * scaleFactor, size * 0.9); // Increased minimum from 0.8 to 0.9
  const scaledDimension = (dim: number) => Math.max(dim * scaleFactor, dim * 0.8); // Added minimum scaling

  // Extract unique dates from slotService
  const uniqueDates = Array.from(
    new Set(slotService?.map((slot) => slot.date))
  );

  // Filter slots for selected date
  const filteredSlots = slotService?.filter(
    (slot) => slot.date === selectedDate.from
  );

  // Function to get day of week from date string
  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const handlebookingsubmit = async () => {
    // If booking for someone else, show secret key modal
    if (!forMe) {
      setsecretemodal(true);
      return;
    }

    // Validate that we have all required data
    if (!selectedSlot) {
      Alert.alert("Please select a time slot first");
      return;
    }

    if (!selectedTime) {
      Alert.alert("Please select a time slot");
      return;
    }

    if (!selectedDate.from) {
      Alert.alert("Please select a date");
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
      doctorId: selectedSlot?.doctorId?.toString() ?? "",
      serviceId: selectedService?.id?.toString() ?? "",
      start_time: selectedTime.split(" - ")[0] ?? "",
      end_time: selectedTime.split(" - ")[1] ?? "",
      date: selectedDate?.from ?? "",
      dayofweek: getDayOfWeek(selectedDate?.from ?? ""), 
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
      
      console.log(bookingPayload)
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[stylesbooking.container, { 
        height: responsiveHeight,
        rowGap: responsiveHeight * 0.214,
        paddingHorizontal: scaledDimension(12)
      }]}>
        <View style={[stylesbooking.userprofile, { 
          height: responsiveHeight * 0.08,
          borderRadius: scaledDimension(23)
        }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[stylesbooking.backButton, { padding: scaledDimension(8) }]}
          >
            <Icon name="arrow-left" size={scaledDimension(24)} color="white" />
          </TouchableOpacity>
          <View style={[stylesbooking.profileview, { padding: scaledDimension(8) }]}>
            <TouchableOpacity
              style={[stylesbooking.imageprofile, { 
                width: scaledDimension(60),
                height: scaledDimension(60),
                borderRadius: scaledDimension(60)
              }]}
              onPress={() => setmodalstatus(true)}
            >
              <Icon name="toolbox" size={scaledDimension(30)} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[stylesbooking.bookingcontainer, { 
          height: responsiveHeight * 0.7,
          width: responsiveWidth * 0.96,
          rowGap: "5%"
        }]}>
          <View style={[stylesbooking.bookingforcontainer, { 
            height: "10%",
            columnGap: scaledDimension(3)
          }]}>
            {selectedService && (
              <View style={[stylesbooking.listofbooking, { 
                width: "100%",
                height: responsiveHeight,
                padding: scaledDimension(20),
                borderRadius: scaledDimension(20)
              }]}>
                <Text
                  style={{ 
                    color: "black", 
                    fontSize: scaledFontSize(22), 
                    fontWeight: "600" 
                  }}
                >
                  You picked:
                </Text>
                <Text style={[stylesbooking.textdiscription1, { 
                  fontSize: scaledFontSize(18),
                  fontWeight: "500"
                }]}>
                  {selectedService.servicename}
                </Text>
                <Text style={[stylesbooking.textdiscription1, { 
                  fontSize: scaledFontSize(18),
                  fontWeight: "500"
                }]}>
                  Time: {selectedTime}
                </Text>
                <Text style={[stylesbooking.textdiscription1, { 
                  fontSize: scaledFontSize(18),
                  fontWeight: "500"
                }]}>
                  From: {selectedDate.from} To: {selectedDate.to}
                </Text>
              </View>
            )}
          </View>
          <View style={[stylesbooking.bookingpage, { 
            height: "80%",
            borderRadius: scaledDimension(40),
            paddingVertical: scaledDimension(20),
            paddingHorizontal: scaledDimension(10),
            top: scaledDimension(35),
            rowGap: scaledDimension(30)
          }]}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: scaledDimension(20) }}
            >
              {/* ForMe Toggle Button */}
              <View style={[stylesbooking.toggleContainer, { 
                marginBottom: scaledDimension(20),
                paddingHorizontal: scaledDimension(10)
              }]}>
                <Text style={[stylesbooking.toggleLabel, { 
                  fontSize: scaledFontSize(16),
                  fontWeight: "600"
                }]}>
                  Booking for:
                </Text>
                <View style={[stylesbooking.toggleButtonContainer, { 
                  borderRadius: scaledDimension(25)
                }]}>
                  <TouchableOpacity
                    style={[
                      stylesbooking.toggleButton,
                      { 
                        paddingVertical: scaledDimension(8),
                        paddingHorizontal: scaledDimension(16)
                      },
                      forMe && stylesbooking.toggleButtonActive
                    ]}
                    onPress={() => setForMe(true)}
                  >
                    <Text style={[
                      stylesbooking.toggleButtonText,
                      { fontSize: scaledFontSize(14) },
                      forMe && stylesbooking.toggleButtonTextActive
                    ]}>
                      For Me
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      stylesbooking.toggleButton,
                      { 
                        paddingVertical: scaledDimension(8),
                        paddingHorizontal: scaledDimension(16)
                      },
                      !forMe && stylesbooking.toggleButtonActive
                    ]}
                    onPress={() => setForMe(false)}
                  >
                    <Text style={[
                      stylesbooking.toggleButtonText,
                      { fontSize: scaledFontSize(14) },
                      !forMe && stylesbooking.toggleButtonTextActive
                    ]}>
                      For Someone Else
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[stylesbooking.bookingpagedate, { 
                rowGap: scaledDimension(10)
              }]}>
                <Icon name="calendar" size={scaledDimension(20)} style={{ color: "#f0f0f0" }} />
                <Text style={[stylesbooking.textdiscription, { 
                  fontSize: scaledFontSize(18),
                  fontWeight: "500"
                }]}>
                  Select Date for the booking
                </Text>
                <View style={[stylesbooking.dateslotecontainer, { 
                  columnGap: responsiveWidth * 0.043
                }]}>
                  {uniqueDates.map((date, index) => {
                    
                    const slotForDate = slotService?.find(slot => slot.date === date);
                    
                    const dayShort = slotForDate ? slotForDate.day_of_week.slice(0, 3) : '';
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[stylesbooking.dateslote, { 
                          width: scaledDimension(80),
                          height: scaledDimension(100),
                          borderRadius: scaledDimension(10)
                        }]}
                        onPress={() => setselectedDate({ from: date, to: date })}
                      >
                        <Text style={[stylesbooking.dateslotecontent, { 
                          fontSize: scaledFontSize(20),
                          fontWeight: "800"
                        }]}>{date.split("-")[2]}</Text>
                        <Text style={[stylesbooking.dateslotecontent, { 
                          fontSize: scaledFontSize(20),
                          fontWeight: "800"
                        }]}>{dayShort}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={stylesbooking.bookingpagetime}>
                <Text style={[stylesbooking.textdiscription, { 
                  fontSize: scaledFontSize(18),
                  fontWeight: "500"
                }]}>
                  Select a time slot
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  persistentScrollbar={true}
                  style={[stylesbooking.scrollcontainer, { 
                    height: scaledDimension(80)
                  }]}
                >
                  {filteredSlots && filteredSlots.length > 0 ? (
                    filteredSlots.map((slot, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setselectedTime(slot.start_time + " - " + slot.end_time);
                          setSelectedSlot(slot);
                        }}
                      >
                        <View style={[stylesbooking.slot, { 
                          width: scaledDimension(150),
                          height: scaledDimension(50),
                          borderRadius: scaledDimension(13),
                          marginTop: scaledDimension(10),
                          marginHorizontal: scaledDimension(23)
                        }]}>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: scaledFontSize(18),
                              fontWeight: 600,
                            }}
                          >
                            {slot.start_time} - {slot.end_time}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ 
                      color: "grey", 
                      fontSize: scaledFontSize(16), 
                      margin: scaledDimension(10) 
                    }}>
                      No slots available for this date
                    </Text>
                  )}
                </ScrollView>
              </View>
              <View style={[stylesbooking.bookingpageprice, { 
                columnGap: responsiveWidth * 0.17,
                marginTop: scaledDimension(20),
                paddingHorizontal: scaledDimension(10)
              }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[stylesbooking.textdiscription, { 
                    fontSize: scaledFontSize(18),
                    fontWeight: "500",
                    marginBottom: scaledDimension(5)
                  }]}>Service Price</Text>
                  <Text style={{ 
                    color: "#333", 
                    fontSize: scaledFontSize(28), 
                    fontWeight: "800" 
                  }}>
                    {selectedService?.serviceprice}.Sh
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={[stylesbooking.bookngbtn, { 
                      height: scaledDimension(55),
                      width: scaledDimension(180),
                      borderRadius: scaledDimension(25),
                      backgroundColor: "#007bff"
                    }]}
                    onPress={handlebookingsubmit}
                  >
                    <Text
                      style={{ 
                        color: "#ffffff", 
                        fontSize: scaledFontSize(18), 
                        fontWeight: "600" 
                      }}
                    >
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
          <View style={[stylesbooking.secretestyles, { 
            height: responsiveHeight,
            width: responsiveWidth,
            rowGap: scaledDimension(20),
            paddingHorizontal: scaledDimension(20)
          }]}>
            <Text style={{ 
              color: "white", 
              fontSize: scaledFontSize(20), 
              fontWeight: "800" 
            }}>
              Book for Someone Else
            </Text>
            <View style={[stylesbooking.secretInputcontainer, { 
              height: scaledDimension(50)
            }]}>
              <TextInput
                style={[stylesbooking.styleInput, { 
                  width: "80%",
                  height: scaledDimension(45),
                  borderRadius: scaledDimension(20),
                  paddingHorizontal: scaledDimension(20)
                }]}
                placeholder="Enter username"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={[stylesbooking.secretInputcontainer, { 
              height: scaledDimension(50)
            }]}>
              <TextInput
                style={[stylesbooking.styleInput, { 
                  width: "80%",
                  height: scaledDimension(45),
                  borderRadius: scaledDimension(20),
                  paddingHorizontal: scaledDimension(20)
                }]}
                placeholder="Enter secret key"
                placeholderTextColor="#ccc"
                value={SecreteKey}
                onChangeText={setSecreteKey}
                secureTextEntry={true}
              />
            </View>
            <View style={[stylesbooking.secretButtonContainer, { 
              columnGap: scaledDimension(10),
              marginTop: scaledDimension(20)
            }]}>
              <TouchableOpacity
                style={[stylesbooking.secretButton, { 
                  paddingVertical: scaledDimension(12),
                  paddingHorizontal: scaledDimension(24),
                  borderRadius: scaledDimension(25),
                  minWidth: scaledDimension(100)
                }]}
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
                 
                  const bookingPayload = {
                    doctorId: selectedSlot?.doctorId?.toString() ?? "",
                    serviceId: selectedService?.id?.toString() ?? "",
                    start_time: selectedTime.split(" - ")[0] ?? "",
                    end_time: selectedTime.split(" - ")[1] ?? "",
                    date: selectedDate?.from ?? "",
                    dayofweek: getDayOfWeek(selectedDate?.from ?? ""),
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
                <Text style={[stylesbooking.secretButtonText, { 
                  fontSize: scaledFontSize(16),
                  fontWeight: "600"
                }]}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[stylesbooking.secretButton, stylesbooking.cancelButton, { 
                  paddingVertical: scaledDimension(12),
                  paddingHorizontal: scaledDimension(24),
                  borderRadius: scaledDimension(25),
                  minWidth: scaledDimension(100)
                }]}
                onPress={() => {
                  setsecretemodal(false);
                  setSecreteKey("");
                  setUsername("");
                }}
              >
                <Text style={[stylesbooking.secretButtonText, { 
                  fontSize: scaledFontSize(16),
                  fontWeight: "600"
                }]}>Cancel</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  userprofile: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
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
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
  },
  bookingpage: {
    backgroundColor: "#f4f4f4",
    height: "80%",
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    top: 35,
    rowGap: 30,
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
