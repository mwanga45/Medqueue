import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import {
  ScrollView,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Servicelistcomp = () => {
  const [service, setservice] = useState<[] | any>([]);
  const handleGetService = async () => {
    try {
      const res = await axios.get(
        "http://192.168.110.251:8800/serviceAvailable"
      );
      if (!res.data.success) {
        Alert.alert(res.data.message);
        return
      }
      const info = res.data;
      setservice(info.data);
    } catch (err) {
      Alert.alert("something went wrong");
      console.error(err);
    }
  };
  useEffect(() => {
    handleGetService()
  }, []);
  return (
    <GestureHandlerRootView style={stylesmodal.container}>
      <View style={stylesmodal.headingpart}>
        <Text style={stylesmodal.texttitle}>
          Here are the List of our Service
        </Text>
      </View>
      <View style={stylesmodal.searchpart}>
        <View style={stylesmodal.textinputcontainer}>
          <TextInput placeholder="search for service" style={stylesmodal.input} />
          <TouchableOpacity>
            <Ionicons name="search" color="grey" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesmodal.listcontainer}></View>
    </GestureHandlerRootView>
  );
};
const { height } = Dimensions.get("window");
const stylesmodal = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  headingpart: {
    height: height * 0.2,
    width: "100%",
    backgroundColor: "rgb(19, 243, 12)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchpart: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08,
    width: "100%",
    backgroundColor: "rgb(64, 64, 64)",
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 10,
    borderRadius:20
  },
  listcontainer: {
    height: height * 0.67,
    width: "100%",
    backgroundColor: "#f4f4f4",
    marginTop: height * 0.02,
    borderRadius: 25,
  },
  texttitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  textinputcontainer: {
    backgroundColor: "white",
    width: "90%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: "80%",
    height: "100%",
    fontWeight: "500",
    fontSize: 19,
    paddingHorizontal: 20,
  },
});

export default Servicelistcomp;
