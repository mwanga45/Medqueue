import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import FloatingBtn from "./component/FloatingBtn";
import Icon from "react-native-vector-icons/FontAwesome5";
import QuickAction from "./component/QuickAction";
import { useRouter } from "expo-router";
import UserRegistration from "./component/userRegistration";
import { Ionicons } from "@expo/vector-icons";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { apiurl } from "./request_response"
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from "react-native-maps";
import App from "./testappnotification";


export default function Home() {
  const [isVerfy, setisVerfy] = useState<boolean | null>(null);
  const [deviceId, setdeviceId] = useState<string>("")
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const [isClosed, setClosed] = useState(true);
  const [showMap, setShowMap] = useState(false); 

  const handleopenMap = () =>{
    setShowMap(true); 
  }


  const dfetchUsernameFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const decoded: any = jwtDecode(token);
        setUsername(decoded.fullname || decoded.Username || "");
      }
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  };

  useEffect(() => {
    const initializer = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          router.push('/login');
          return;
        }
        try {
          const decoded: any = jwtDecode(token);
          setUsername(decoded.fullname || decoded.Username || "");
          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            await AsyncStorage.setItem('userToken', '');
            router.push('/login');
            return;
          }
        } catch (decodeErr) {
          await AsyncStorage.setItem('userToken', '');
          router.push('/login');
          return;
        }
      } catch (err) {
        Alert.alert("Failed to get token");
        console.error(err);
        router.push('/login');
      }
    };
    initializer();
  }, [router]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={{ alignItems: "flex-end", position: "absolute", top: 10, left: 10, width:"100%", justifyContent:"flex-end" }}>
        <TouchableOpacity style={styles.homemap}  onPress={handleopenMap}>
          <Ionicons name="earth" size={34} color="white" />
        </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>MedQueu</Text>
          <Icon name="hospital-symbol" size={100} style={{ color: "silver" }} />
        </View>
      </View>
      <View>
        <Text style={styles.TextQuick}>QuickAction</Text>
      </View>
      <View style={styles.content}>
        <FloatingBtn isBoolean={false} />
        <View style={styles.Homepagecover2}>
          <View>
            <QuickAction
              name="book"
              size={30}
              text="Booking"
              backgroundColor="#274b5f"
              onclick={() => router.push("/booking")}
            />
          </View>
          <View>
            <QuickAction
              name="prescription"
              size={30}
              text="Medicine-prescription"
              backgroundColor="#4b5f"
              onclick={() => router.push("/medicAssign")}
            />
          </View>
        </View>
        <View style={styles.Homepagecover2}>
          <View>
            <QuickAction
              name="user-md"
              size={30}
              text="Doctor-available"
              backgroundColor="#d51341"
              onclick={() => router.push("/doctor-availability")}
            />
          </View>
          <View>
            <QuickAction
              name=""
              size={30}
              text="Recommendation"
              backgroundColor="#645"
              onclick={() => router.push("/PushNotification")}
            />
          </View>
        </View>
        <View style={styles.usernameaccount}>
          <Text style={{ color: "grey", fontSize: 18, fontWeight: 800 }}>
            {username ? `Hi ${username}` : "Hi"}
          </Text>
        </View>
      </View>
      <Modal
        visible={isVerfy === false}
        onRequestClose={() => setClosed(false)}
        animationType="slide"
      >
        <View
          style={{
            backgroundColor: "#05992C",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Ionicons name="medical" size={100} color="white" />
          <UserRegistration />
        </View>
      </Modal>
      <Modal
        visible={showMap} 
        onRequestClose={() => setShowMap(false)} 
        animationType="slide">
        <SafeAreaView
          style={{
            backgroundColor: "#05992C",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 0.5,
          }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: -6.76714,
              longitude: 39.2706,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}>
            <Marker
              coordinate={{ latitude: -6.76714, longitude: 39.2706 }}
              title="Hospital Location"
              description="This is the location of the hospital."
              onDrag={(e) => JSON.stringify(e.nativeEvent.coordinate)}
                />
          </MapView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    height: height * 0.3,
    backgroundColor: "#4CAF50",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  homemap: {
    position: "absolute",
    top: 8,
    left: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  Homepagecover2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    columnGap: 10,
    marginTop: 10,
  },
  TextQuick: {
    fontSize: 25,
    fontWeight: "900",
    margin: 12,
    color: "silver",
  },
  usernameaccount: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
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
