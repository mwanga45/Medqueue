import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions,StyleSheet , TouchableOpacity} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
// get the width of the window every time this page is mount
const { width } = Dimensions.get("window");
const Authentication = () => {
    const router = useRouter()
  const [isAuthentication, setisAuthentication] = useState(false); // state of track the authentication proccess

  const [Error, setError] = useState(null); // state to handle error

  const [isbiometric, setisbiometric] = useState(false); // state  check if the biometric  exist in current device

  const checkbiometric = async () => {
    const hashardware = await LocalAuthentication.hasHardwareAsync(); // check if device having a biometric features return boolian

    const hassetbiometric = await LocalAuthentication.isEnrolledAsync(); // check if the device have already  have biometric details sets return boolian
    setisbiometric(hashardware && hassetbiometric); //set the state biomestric
  };
  useEffect(() => {
    checkbiometric(); // this function will be executed once the  page is mount
  }, []);
  const handleAuthentication = async()=>{
    try{
        setError(null)
        setisAuthentication(true)
        const hashardware = await LocalAuthentication.hasHardwareAsync();
        const EnrollingBiometric = await LocalAuthentication.isEnrolledAsync();
        const supporttype = await LocalAuthentication.supportedAuthenticationTypesAsync()
        const Auth = await LocalAuthentication.authenticateAsync({
            promptMessage:
            hashardware && EnrollingBiometric ? "USE FACE ID / FINGERPRINT": "US PIN code to access service  ",
            fallbackLabel:"USE PIN",
            cancelLabel:"Cancel",
            disableDeviceFallback:false
        });
        if(Auth.success){
            router.replace("/homepage/home")

        }else{
            setError("failed to verify try again ")
        }
    }catch(error){
        setError("something went wrong")

    }finally{
       setisAuthentication(false)

    }

  };
  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name="medical" size={80} color="white" />
      </View>

      <Text style={styles.title}>Medqueue</Text>
      <Text style={styles.subtitle}>For best medication provison</Text>

      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.instructionText}>
          {isbiometric
            ? "Use Face ID/Touch ID or PIN to access your medications"
            : "Enter your PIN to access your medications"}
        </Text>

        <TouchableOpacity
          style={[styles.button, isAuthentication && styles.buttonDisabled]}
          onPress={handleAuthentication}
          disabled={isAuthentication}
        >
          <Ionicons
            name={isbiometric ? "finger-print-outline" : "keypad-outline"}
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>
            {isAuthentication
              ? "Verifying..."
              : isbiometric
              ? "Authenticate"
              : "Enter PIN"}
          </Text>
        </TouchableOpacity>

        {Error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#f44336" />
            <Text style={styles.errorText}>{Error}</Text>
          </View>
        )}
      </View>
    </View>
  </LinearGradient>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    iconContainer: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
      textShadowColor: "rgba(0, 0, 0, 0.2)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    subtitle: {
      fontSize: 18,
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: 40,
      textAlign: "center",
    },
    card: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      width: width - 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    instructionText: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 30,
    },
    button: {
      backgroundColor: "#4CAF50",
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 12,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonIcon: {
      marginRight: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: "#ffebee",
      borderRadius: 8,
    },
    errorText: {
      color: "#f44336",
      marginLeft: 8,
      fontSize: 14,
    },
  });

export default Authentication;
