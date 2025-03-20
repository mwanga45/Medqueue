import React, { useState } from "react";
import DeviceInfo from 'react-native-device-info';
import { Platform, View, Text, TouchableOpacity, TextInput, Alert,StyleSheet} from "react-native";
import * as Application from "expo-application";
import Constants from 'expo-constants';
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

const UserReg = ({ close }) => {
  const deviceId = DeviceInfo.getUniqueId();
  const [FormState, setFormState] = useState({
    fullname: "",
    phone_num: "",
    email_address: "",
    home_address: "",
    age: "",
  });

  const handleTextChange = (fieldname, value) => {
    setFormState((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return regex.test(String(email).toLowerCase());
  };

  // Phone validation regex
  const validatePhone = (phone) => {
    const regex1 = /^07\d{8}$/;
    const regex2 = /^(?:0|\+255)7\d{8}$/;
    return regex1.test(phone) || regex2.test(phone);
  };

  const handleSubmit = async () => {
    const { fullname, phone_num, email_address, age } = FormState;
    if (
      fullname.trim() === "" ||
      phone_num.trim() === "" ||
      email_address.trim() === "" ||
      age.trim() === ""
    ) {
      Alert.alert("Error", "Full name, phone number, email, and age are required.");
      return;
    }

    if (!validateEmail(email_address)) {
      Alert.alert("Error", "Invalid email, please try again.");
      return;
    }

    if (!validatePhone(phone_num)) {
      Alert.alert("Error", "Invalid phone number.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.104.251:8800/register", {
        fullname: FormState.fullname,
        phone_num: FormState.phone_num,
        email_address: FormState.email_address,
        home_address: FormState.home_address,
        age: FormState.age,
        deviceId: deviceId,
      });

      if (response.data.success) {
        Alert.alert("Success", "User registered successfully!");
        setFormState({
          fullname: "",
          phone_num: "",
          email_address: "",
          home_address: "",
          age: "",
        });
        if (close) close();
      } else {
        Alert.alert("Registration Failed", response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };
  return (
    <View style={reg.userregcontainer}>
      <View style={reg.close}>
        <TouchableOpacity>
          <Icon
            name="times"
            size={24}
            color="rgb(74, 73, 73)"
            onPress={close}
          />
        </TouchableOpacity>
      </View>
      <View style={reg.formtitleview}>
        <Icon name="user" size={34} color="rgb(17, 17, 17)" onPress={close} />
        <Text style={{ fontSize: 24, color: "grey", fontWeight: "900" }}>
          Register User
        </Text>
      </View>
      <View style={reg.formregpart}>
        <TextInput
          value={FormState.fullname}
          onChangeText={(text)=>handleTextChange("fullname", text)}
          placeholder="full name please"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop: 30,
          }}
        />
        <TextInput
          value={FormState.age}
          onChangeText={(text)=>handleTextChange("age", text)}
          placeholder="please enter your age"
          keyboardType="numeric"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop: 30,
          }}
        />
        <TextInput
          value={FormState.phone_num}
          onChangeText={(text)=>handleTextChange("phone_num", text)}
          placeholder="Phone number eg 07......."
          keyboardType="numeric"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop: 30,
          }}
        />
        <TextInput
          value={FormState.email_address}
          onChangeText={(text)=>handleTextChange("email_address", text)}
          placeholder="email please"
          keyboardType="email-address"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop: 30,
          }}
        />
        <TextInput
          value={FormState.home_address}
          onChangeText={(text)=>handleTextChange("home_address",text)}
          placeholder="home address if you have please"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            width: 250,
            borderRadius: 10,
            marginTop: 30,
          }}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "rgb(35, 35, 35)",
            marginTop: 32,
            height: 39,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, letterSpacing: 2 }}>
            Register
          </Text>
        </TouchableOpacity>
        <Text></Text>
      </View>
    </View>
  );
};

const reg = StyleSheet.create({
  userregcontainer: {
    position: "absolute",
    height: 550,
    backgroundColor: "white",
    top: 200,
    width: "90%",
    right: 17,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    zIndex: 100,
  },
  close: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 12,
  },
  formregpart: {
    justifyContent: "center",
    alignItems: "center",
    columnGap: 12,
  },
  formtitleview: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserReg;
