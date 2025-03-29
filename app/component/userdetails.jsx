import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import Icon from "react-native-vector-icons/FontAwesome5";
const { width } = Dimensions.get("window");
const UserDetails = ({ onClose }) => {
  const [userProfile, setuserProfile] = useState([]);
  const handleprofile = async() => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const response = await axios.post(
        "http://192.168.139.251:8800/userinfo",
        { deviceId }
      );
      if (response.data.success) {
        const endpoint = response.data
        setuserProfile(endpoint.data);
      } else {
        Alert.alert(
          "Something went wrong",
          response.data.message || "failed to Fetch data"
        );
      }
    } catch (err) {
      console.error("InternaserverError", err);
    }
  };
  useEffect(() => {
    handleprofile();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="times" size={20} color="#000" />
      </TouchableOpacity>

      <View style={styles.userProfile}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.username}>
        {userProfile.name !== "" ?"Hi!"+" "+ userProfile.name: "Your name"}
        </Text>
      </View>
      <View style={styles.line}></View>
      <View>
        <View>
          <TouchableOpacity style={styles.optionaldetails}>
            <Icon name="user" size={18} color="white" />
            <Text style={{ color: "white" }}>Your Profile</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.optionaldetails}>
            <Icon name="stethoscope" size={18} color="white" />
            <Text style={{ color: "white" }}>Medical detail</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.optionaldetails}>
            <Icon name="calendar-check" size={18} color="white" />
            <Text style={{ color: "white" }}>Booking Recode && Tracking</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.optionaldetails}>
            <Icon name="sign-out-alt" size={18} color="white" />
            <Text style={{ color: "white" }}>Sign-Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    top: "30%",
    backgroundColor: "#2c3e50",
    width: width * 0.7,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: "45%",
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
    bottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    color: "#ecf0f1",
    fontSize: 18,
    fontWeight: "600",
  },
  optionaldetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 40,
    columnGap: 32,
  },
  line: {
    borderBottomColor: "grey",
    borderWidth: 1,
    bottom: 20,
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
export default UserDetails;
