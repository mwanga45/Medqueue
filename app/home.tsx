import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import FloatingBtn from "./component/FloatingBtn";
import Icon from "react-native-vector-icons/FontAwesome5";
import QuickAction from "./component/QuickAction";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerText}>MedQueue</Text>
          <Icon name="hospital-symbol" size={100} style={{ color: "silver" }} />
        </View>
      </View>
      <View style={styles.content}>
        <FloatingBtn isBoolean={false} />
        <Text style={styles.welcomeText}>Hello world</Text>
        <View style={styles.Homepagecover2}>
          <View>
            <QuickAction
              name="medkit"
              size={30}
              text="Emergence"
              backgroundColor="#274b5f"
              onclick={() => {}}
            />
          </View>
          <View >
            <QuickAction
              name="book"
              size={30}
              text="Booking"
              backgroundColor="#00d4ff"
              onclick={() => {}}
            />
          </View>
        </View>
      </View>
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
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  Homepagecover2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    columnGap:10
  },
});
