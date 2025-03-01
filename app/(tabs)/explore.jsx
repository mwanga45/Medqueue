// import React,{useEffect,useState} from 'react';
// import { StyleSheet,FlatList,Text, View} from 'react-native';
// import Dklistcard from "../component/doctorlistcard";
// import Dktcard from "../component/doctorcard"
// import Navigationbar from "../component/navigation"
// import ServiceAvailablecomp from "../component/serviceAvailablecomp"




// export default function TabTwoScreen() {
//     const [timeSlots, setTimeSlots] = useState([]);
  
//     useEffect(() => {
//       generateTimeSlots();
//     }, []);
  
//     const generateTimeSlots = () => {
//       const slots = [];
//       const startTime = new Date();
//       startTime.setHours(6, 30, 0, 0);
//       const endTime = new Date();
//       endTime.setHours(20, 30, 0, 0);
  
//       const currentTime = new Date(startTime);
//       while (currentTime <= endTime) {
//         // Format the time as "HH:MM AM/PM"
//         slots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//         // Increment by 10 minutes
//         currentTime.setMinutes(currentTime.getMinutes() + 15);
//       }
//       setTimeSlots(slots);
//     };
//   return (
//     <View style= {teststyle.maintest}>
//         {/* <Dklistcard/> */}
//         {/* <Dktcard name={"Paul Solm"} specialist={"Therapist"}/> */}
//         <ServiceAvailablecomp/>
//         <View style={{ flex: 1, padding: 20 }}>
//       <FlatList
//         data={timeSlots}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Text style={{ fontSize: 16, paddingVertical: 4 }}>{item}</Text>
//         )}
//       />
//     </View>

//         <Navigationbar/>
//     </View>
//     )
//   }
//   const teststyle = StyleSheet.create({
//     maintest:{
//       flex:1,
//       backgroundColor:"white",
//       justifyContent:"center",
//       alignItems:"center"
//     }
//   })
// PushNotificationSample.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { usePushNotifications } from "./usePushNotifications";
import * as Notifications from "expo-notifications";

const PushNotificationSample = () => {
  const { expoPushToken, notification } = usePushNotifications();

  // Function to send a local notification.
  const sendLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a sample notification sent locally!",
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notification Demo</Text>
      <Text style={styles.tokenLabel}>Expo Push Token:</Text>
      <Text style={styles.token}>
        {expoPushToken ? expoPushToken.data : "Fetching token..."}
      </Text>
      <Button title="Send Notification" onPress={sendLocalNotification} />
      {notification && (
        <Text style={styles.notificationText}>
          Last Notification: {notification.request.content.title}
        </Text>
      )}
    </View>
  );
};

export default PushNotificationSample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  tokenLabel: {
    fontSize: 18,
    marginTop: 10,
  },
  token: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  notificationText: {
    marginTop: 20,
    fontSize: 16,
  },
});
