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
          <Text style={styles.headerText}>MedQueu</Text>
          <Icon name="hospital-symbol" size={100} style={{ color: "silver" }} />
        </View>
      </View>
      <View>
        <Text style={styles.TextQuick}>QuickAction</Text>
      </View>
      <View style={styles.content}>
        <FloatingBtn isBoolean={false} />
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
          <View>
            <QuickAction
              name="history"
              size={30}
              text="Booking-history"
              backgroundColor="#4b5f"
              onclick={() => {}}
            />
          </View>
        </View>
        <View style={styles.Homepagecover2}>
          <View>
            <QuickAction
              name="user-md"
              size={30}
              text="Doctor-available"
              backgroundColor="#d51341"
              onclick={() => router.push("/doctor-availability")}
            />
          </View>
          <View>
            <QuickAction
              name="ambulance"
              size={30}
              text="emergency"
              backgroundColor="#f52d56"
              onclick={() => router.push("/emergency")}
            />
          </View>
        </View>
        <View style={styles.usernameaccount}>
          <Text style={{color:"grey", fontSize:18 ,fontWeight:800}}>Hi Issa Mwanga</Text>
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
    justifyContent: "flex-start",
    paddingTop: 10,
  },

  Homepagecover2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    columnGap: 10,
    marginTop: 10,
  },
  TextQuick: {
    fontSize: 25,
    fontWeight: "900",
    margin: 12,
    color: "silver",
  },
  usernameaccount: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
