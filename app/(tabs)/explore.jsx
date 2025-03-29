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
// import React from "react";
// import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
// import { usePushNotifications } from "./usePushNotifications";
// import Navigationbar from "../component/navigation"
// import * as Notifications from "expo-notifications";
// import DeviceInfo from 'react-native-device-info'
// // import { GiftedChat } from 'react-native-gifted-chat'
// import Constants from 'expo-constants';
// import * as Application from 'expo-application'
// import Userdetails from '../component/userdetails'
// import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
// import {Gesture,GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"



// const PushNotificationSample = () => {
//   // Get the persistent installation ID (works on all platforms)
//   const installationId = Constants.installationId;
//   const device_id= DeviceInfo.getUniqueId()
//   // Platform-specific identifiers (optional)
//   const androidId = Application.androidId; // Android only
//   const iosId = Application.getIosIdForVendorAsync(); // iOS only
//   const { expoPushToken, notification } = usePushNotifications();

//   // Function to send a local notification.
//   const sendLocalNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Test Notification",
//         body: "This is a sample notification sent locally!",
//       },
//       trigger: { seconds: 2 },
//     });
//   };

//   const width = useSharedValue(100)
//   const handlewidth =()=>{
//     width.value = withSpring(width.value +50)
//   }
//   const tap = Gesture. Tap()
//   const pressed = useSharedValue(false)
//   // .onBegin(() => {
//   //   pressed.value = true;
//   // })
//   // .onTouchesBegan(()=>{
//   //   pressed.value = true
//   // })
//   // .onToachesEnd(()=>{
//   //   pressed.value = false
//   // })
//   // .onHandlerStateChange((event)=>{
//   //   if (event.nativeEvent.state === state.BEGAN){
//   //     pressed.value = true
//   //   }
//   //   if (event.nativeEvent.state === state.END){
//   //     pressed.value = false
//   //   }
//   // })
//   // .onHandlerStateChange((event) => {
//   //   if (event.nativeEvent.state === State.BEGAN) {
//   //     pressed.value = true;
//   //   }
//   //   if (event.nativeEvent.state === State.END) {
//   //     pressed.value = false;
//   //   }
//   // });
//   // .onBegin(() => {
//   //   pressed.value = true;
//   // })
//   // .onFinalize(() => {
//   //   pressed.value = false;
//   // });

//   const animatedStyle = useAnimatedStyle(()=>({
//     backgroundColor:pressed.value ?'blue' : 'yellow',
//     transform: [{scale:withTiming(pressed.value? 1.2 : 1)}] 
//   }))

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Push Notification Demo</Text>
//       <Text style={styles.tokenLabel}>Expo Push Token:</Text>
//       <Text style={styles.token}>
//         {expoPushToken ? expoPushToken.data : "Fetching token..."}
//       </Text>
//       <Button title="Send Notification" onPress={sendLocalNotification} />
//       {notification && (
//         <Text style={styles.notificationText}>
//           Last Notification: {notification.request.content.title}
//         </Text>
//       )}
//           <View style={styles.container}>
//       <Text style={styles.text}>
//         Installation ID: {installationId}
//       </Text>
//       {androidId && <Text>Android ID: {androidId}</Text>}
//       <Text style={{ fontSize: 18 }}>
//         Device Identifier: {device_id}
//       </Text>
//       {/* <Userdetails/> */}
//       <Animated.View style= {{
//         width,
//         height:100,
//         backgroundColor:"violet"
//       }} />
//       <TouchableOpacity onPress={handlewidth} style={{height:32, width:32, backgroundColor:"white",marginTop:12}}>
//         <Text>Click Me</Text>
//       </TouchableOpacity>

//       <GestureHandlerRootView>
//         <GestureDetector gesture={tap}>
//           <Animated.View style ={[styles.circle, animatedStyle]}>
//             <Text>Tap Me!</Text>
//           </Animated.View>
//         </GestureDetector >
//       </GestureHandlerRootView>
//     </View>
//       <Navigationbar/>
//     </View>
//   );
// };

// export default PushNotificationSample;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   tokenLabel: {
//     fontSize: 18,
//     marginTop: 10,
//   },
//   token: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   notificationText: {
//     marginTop: 20,
//     fontSize: 16,
//   },
//   circle:{
//     backgroundColor:"white",
//     width:"40%",
//     height:50,
//     marginTop:12,
//     borderRadius:35

//   }
// });
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 120;
const BOUNDARY_OFFSET = 50;

export default function App() {
  const offset = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      // highlight-next-line
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      // highlight-start
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ],
      });
      // highlight-end
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
