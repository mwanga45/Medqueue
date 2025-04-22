import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeviceId } from "../utils/deviceId";
import axios from "axios";
const { height } = Dimensions.get("window");

const UserRegistration = () => {
  const [deviceId, setdeviceId] = useState(null);
  const [FormField, setFormField] = useState({
    firstname: "",
    secondname: "",
    secretekey: "",
    confirmkey: "",
    dial: "",
    email: "",
    birthdate: "",
    homeaddress: "",
  });
  const handleInputOnchange = (fieldname, value) => {
    setFormField((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return regex.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const regex1 = /^07\d{8}$/;
    const regex2 = /^(?:0|\+255)7\d{8}$/;
    return regex1.test(phone) || regex2.test(phone);
  };
  const handleSubmit = async () => {
    const {
      firstname,
      secondname,
      secretekey,
      confirmkey,
      dial,
      email,
      birthdate,
      homeaddress,
    } = FormField;

    if (
      firstname.trim() === "" ||
      secondname.trim() ||
      secretekey.trim() === "" ||
      dial.trim() ||
      email.trim() ||
      birthdate.trim() ||
      homeaddress.trim() ||
      confirmkey.trim()
    ) {
      Alert.alert("Please fill alrequired field");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Please Enter correct format of email");
      return;
    }
    if (!validatePhone(dial)) {
      Alert.alert(
        "Please make sure is correct phone number use either 07 or 255"
      );
      return;
    }
    if (confirmkey !== secretekey) {
      Alert.alert(
        "Please make sure Secrete key and confim secrete key they match"
      );
      return;
    }
    const respond = await axios.post("http://192.168.236.251:8800/register", {
      firstname: FormField.firstname,
      secondname: FormField.secondname,
      secretekey: FormField.secretekey,
      dial: FormField.dial,
      email: FormField.email,
      birthdate: FormField.birthdate,
      homeaddress: FormField.homeaddress,
      deviceId: deviceId,
    });

    if (respond.data.success) {
      Alert.alert("Successfully registed ", `${firstname},${secondname}`);
      setFormField({
        firstname: "",
        secondname: "",
        secretekey: "",
        confirmkey: "",
        email: "",
        dial: "",
        homeaddress: "",
      });
    }
  };
  useEffect(() => {
    async () => {
      const id = await getDeviceId();
      setdeviceId(id);
    };
  });
  return (
    <SafeAreaView style={stylesform.container}>
      <View style={stylesform.descriptionform}>
        <Text style={{ fontSize: 29, color: "#454345", fontWeight: 800 }}>
          Get Started Now{" "}
        </Text>
        <Text style={{ fontSize: 16, color: "grey", fontWeight: "400" }}>
          Create an Account to get Full access of our service
        </Text>
      </View>
      <View style={stylesform.formcontainer}>
        <View style={stylesform.NamesUser}>
          <TextInput
            style={{
              width: "50%",
              borderWidth: 2,
              height: height * 0.05,
              borderRadius: 23,
              paddingHorizontal: 12,
              borderColor: "grey",
            }}
            placeholder="firstname"
            value={FormField.firstname}
          ></TextInput>
          <TextInput
            style={{
              width: "50%",
              borderWidth: 2,
              height: height * 0.05,
              paddingHorizontal: 12,
              borderRadius: 23,
              borderColor: "grey",
            }}
            placeholder="secondname"
            value={FormField.secondname}
          ></TextInput>
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Secrete Key.."
            value={FormField.secretekey}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Confirm-Secrete Key.. "
            value={FormField.confirmkey}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Dial +255..."
            value={FormField.dial}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Birthdate.."
            value={FormField.birthdate}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Email.."
            value={FormField.email}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Home address.."
            value={FormField.homeaddress}
          />
        </View>
        <TouchableOpacity style={stylesform.btn}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const stylesform = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
  },
  descriptionform: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  formcontainer: {
    width: "100%",
    padding: 10,
  },
  NamesUser: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    columnGap: 10,
  },
  container_inputField: {
    width: "100%",
    height: height * 0.05,
    marginVertical: height * 0.01,
  },
  inputfield: {
    width: "100%",
    borderWidth: 2,
    height: height * 0.05,
    borderRadius: 23,
    paddingHorizontal: 12,
    borderColor: "grey",
  },
  btn: {
    marginTop: 12,
    backgroundColor: "black",
    height: height * 0.06,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserRegistration;
