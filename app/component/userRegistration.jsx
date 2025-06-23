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
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import { apiurl } from "../request_response";
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
  const handledeviceId = async()=>{
    const deviceId = await DeviceInfo.getUniqueId()
    setdeviceId(deviceId)
  }
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
    try {
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
        !firstname?.trim() ||
        !secondname?.trim() ||
        !secretekey?.trim() ||
        !dial?.trim() ||
        !email?.trim() ||
        !birthdate?.trim() ||
        !homeaddress?.trim() ||
        !confirmkey?.trim()
      ) {
        Alert.alert("Please fill all required fields");
        return;
      }
  
      if (!validateEmail(email)) {
        Alert.alert("Please enter a valid email format");
        return;
      }
  
      if (!validatePhone(dial)) {
        Alert.alert("Invalid phone number - use either 07 or 255 prefix");
        return;
      }
  
      if (confirmkey !== secretekey) {
        Alert.alert("Secret key and confirmation key do not match");
        return;
      }
  
      if (!deviceId) {
        Alert.alert("System error: Failed to retrieve device ID");
        return;
      }
  
      const response = await axios.post(apiurl+"auth/register", {
        firstname,
        secondname,
        secretekey,
        dial,
        email,
        birthdate,
        homeaddress,
        deviceId
      });
  
      if (response.data.success) {
        Alert.alert("Registration Successful", `${firstname} ${secondname}`);
        setFormField({
          firstname: "",
          secondname: "",
          secretekey: "",
          confirmkey: "",
          email: "",
          dial: "",
          birthdate: "",
          homeaddress: "",
        });
      }
  
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || error.message || "Unknown error occurred"
      );
    }
  };
  useEffect(() => {
   handledeviceId()
  },[]);
  return (
    <SafeAreaView style={stylesform.container}>
      <View style={stylesform.descriptionform}>
        <Text style={{ fontSize: 29, color: "#454345", fontWeight: 800 }}>
          Get Started Now 
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
            onChangeText={(text)=> handleInputOnchange("firstname",text)}
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
            onChangeText={(text)=> handleInputOnchange("secondname",text)}
          ></TextInput>
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Secrete Key.."
            value={FormField.secretekey}
            onChangeText={(text)=> handleInputOnchange("secretekey", text)}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Confirm-Secrete Key.. "
            value={FormField.confirmkey}
            onChangeText={(text)=> handleInputOnchange("confirmkey",text)}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Dial +255..."
            value={FormField.dial}
            onChangeText={(text)=> handleInputOnchange("dial",text)}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Birthdate.."
            value={FormField.birthdate}
            onChangeText={(text)=> handleInputOnchange("birthdate",text)}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Email.."
            value={FormField.email}
            onChangeText={(text)=> handleInputOnchange("email",text)}
          />
        </View>
        <View style={stylesform.container_inputField}>
          <TextInput
            style={stylesform.inputfield}
            placeholder="Home address.."
            value={FormField.homeaddress}
            onChangeText={(text)=> handleInputOnchange("homeaddress", text)}
          />
        </View>
        <TouchableOpacity style={stylesform.btn} onPress={handleSubmit}>
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
