import React, { useEffect, useState } from "react";
import DeviceInfo from 'react-native-device-info';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width, height } = Dimensions.get('window');

const UserReg = ({ close }) => {
  const [deviceId, setDeviceId] = useState(null);
  
  // this is because the getUniqueId method is return promise object first so thus why we need to asnyc it first
  const handledeviceId = async () => {
    const device_Id = await DeviceInfo.getUniqueId();
    setDeviceId(device_Id);
  };
  
  useEffect(() => {
    handledeviceId();
  }, []);
  
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
      // console.log("Device ID:", deviceId); 
      const response = await axios.post("http://192.168.139.251:8800/register", {
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
      console.error("Error:", err.response ? err.response.data : err);
      Alert.alert("Error", err.response?.data?.message || "Something went wrong.");  
    }
  };
  
  return (
    <SafeAreaView style={reg.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={reg.keyboardAvoidingView}
      >
        <View style={reg.userregcontainer}>
          <View style={reg.header}>
            <TouchableOpacity onPress={close} style={reg.closeButton}>
              <Icon name="times" size={24} color="white" />
            </TouchableOpacity>
            <Text style={reg.headerTitle}>User Registration</Text>
            <View style={reg.placeholder} />
          </View>
          
          <ScrollView 
            style={reg.scrollView}
            contentContainerStyle={reg.scrollViewContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={reg.formtitleview}>
              <Icon name="user" size={34} color="#4CAF50" />
              <Text style={reg.titleText}>Register User</Text>
            </View>
            
            <View style={reg.formregpart}>
              <View style={reg.inputContainer}>
                <Icon name="user" size={20} color="#757575" style={reg.inputIcon} />
                <TextInput
                  value={FormState.fullname}
                  onChangeText={(text) => handleTextChange("fullname", text)}
                  placeholder="Full Name"
                  style={reg.input}
                  placeholderTextColor="#999"
                  selectionColor="#4CAF50"
                  autoCapitalize="words"
                />
              </View>
              
              <View style={reg.inputContainer}>
                <Icon name="birthday-cake" size={20} color="#757575" style={reg.inputIcon} />
                <TextInput
                  value={FormState.age}
                  onChangeText={(text) => handleTextChange("age", text)}
                  placeholder="Age"
                  keyboardType="numeric"
                  style={reg.input}
                  placeholderTextColor="#999"
                  selectionColor="#4CAF50"
                  maxLength={2}
                />
              </View>
              
              <View style={reg.inputContainer}>
                <Icon name="phone" size={20} color="#757575" style={reg.inputIcon} />
                <TextInput
                  value={FormState.phone_num}
                  onChangeText={(text) => handleTextChange("phone_num", text)}
                  placeholder="Phone Number (e.g., 07...)"
                  keyboardType="numeric"
                  style={reg.input}
                  placeholderTextColor="#999"
                  selectionColor="#4CAF50"
                  maxLength={15}
                />
              </View>
              
              <View style={reg.inputContainer}>
                <Icon name="envelope" size={20} color="#757575" style={reg.inputIcon} />
                <TextInput
                  value={FormState.email_address}
                  onChangeText={(text) => handleTextChange("email_address", text)}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  style={reg.input}
                  placeholderTextColor="#999"
                  selectionColor="#4CAF50"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={reg.inputContainer}>
                <Icon name="home" size={20} color="#757575" style={reg.inputIcon} />
                <TextInput
                  value={FormState.home_address}
                  onChangeText={(text) => handleTextChange("home_address", text)}
                  placeholder="Home Address (Optional)"
                  style={reg.input}
                  placeholderTextColor="#999"
                  selectionColor="#4CAF50"
                />
              </View>
              
              <TouchableOpacity
                onPress={handleSubmit}
                style={reg.submitButton}
              >
                <Text style={reg.submitButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const reg = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  userregcontainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  formtitleview: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
  },
  formregpart: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserReg;
