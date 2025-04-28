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
        return;
      }
      const info = res.data;
      setservice(info.data);
    } catch (err) {
      Alert.alert("something went wrong");
      console.error(err);
    }
  };
  const OnHandleService = () => {
    Alert.alert(`Confirm the Service ${service.disease}`);
  };
  useEffect(() => {
    handleGetService();
  }, []);
  return (
    <GestureHandlerRootView style={stylesmodal.container}>
      <View style={stylesmodal.headingpart}>
        <Text style={stylesmodal.texttitle}>
          Here are the List of our Service
          {service.disease}
        </Text>
      </View>
      <View style={stylesmodal.searchpart}>
        <View style={stylesmodal.textinputcontainer}>
          <TextInput
            placeholder="search for service"
            style={stylesmodal.input}
          />
          <TouchableOpacity>
            <Ionicons name="search" color="grey" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={stylesmodal.listcontainer}>
        {Array.isArray(service) &&
          service.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                style={stylesmodal.listcover}
                key={index}
                onPress={OnHandleService}
              >
                <Text style={stylesmodal.titlelist}>{item.disease}</Text>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                  <Text style={stylesmodal.Description}>
                    {item.serviceDescription}
                  </Text>
                  <Text style={stylesmodal.amount}>
                    {item.consultationFee}Tsh
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
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
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listcontainer: {
    height: height * 0.67,
    width: "100%",
    backgroundColor: "#f4f4f4",
    marginTop: height * 0.02,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
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
  listcover: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 20,
    marginTop: 5,
  },
  titlelist: {
    color: "grey",
    fontSize: 18,
    fontWeight: "800",
  },
  amount: {
    color:"blue",
    fontWeight:"800",
    fontSize:17,
  },
  Description: {
    color:"black",
    fontSize:15,
    fontWeight:"700"
  },
});

export default Servicelistcomp;
