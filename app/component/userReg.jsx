import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
const UserReg = ({ close }) => {
  const [Formstate, setFormstate] = useState({
    fullname: "",
    phone_num: "",
    email_address: "",
    home_address: "",
  });
  const handleTextchange = (fieldname, value) => {
    setFormstate((prevstate) => ({
      ...prevstate,
      [fieldname]: value,
    }));
  };
  // validate email
  const validateEmail = (email) => {
    const em =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return em.test(String(email).toLocaleLowerCase());
  };
  const validatePhone = (phone) => {
    const phloc = /^07\d{8}$/;
    const phIn = /^(?:0|\+255)7\d{8}$/;
    return phloc.test(phone) || phIn.test(phone);
  };
  const handlesubmit = () => {
    const { fullname, phone_num, email } = Formstate;

    if (
      fullname.trim() === "" ||
      phone_num.trim() === "" ||
      email.trim() === ""
    ) {
      Alert.alert("fullname or phone_number or email are reuired all");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("invalid email try again ");
      return;
    }
    if (!validatePhone(phone_num)) {
      Alert.alert("invalid phone number");
      return;
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
          value={Formstate.fullname}
          onChangeText={(text)=>handleTextchange("fullname", text)}
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
          value={Formstate.phone_num}
          onChangeText={(text)=>handleTextchange("phone_num", text)}
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
          value={Formstate.email_address}
          onChangeText={(text)=>handleTextchange("email_address", text)}
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
          value={Formstate.home_address}
          onChangeText={(text)=>handleTextchange("home_address",text)}
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
          onPress={handlesubmit}
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
