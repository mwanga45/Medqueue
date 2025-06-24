// import { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform, TextInput, Alert, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';

// interface MyNotificationBehavior extends Notifications.NotificationBehavior {
//   shouldShowBanner?: boolean;
//   shouldShowList?:   boolean;
// }

// // 2. Cast the return value to your augmented interface
// Notifications.setNotificationHandler({
//   handleNotification: async () =>
//     ({
//       shouldShowAlert:   true,
//       shouldPlaySound:  false,
//       shouldSetBadge:   false,
//       shouldShowBanner: true,
//       shouldShowList:   true,
//     } as MyNotificationBehavior),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
//   const [notification, setNotification] = useState<Notifications.Notification | undefined>(
//     undefined
//   );
//   const [notificationHistory, setNotificationHistory] = useState<Notifications.Notification[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [customTitle, setCustomTitle] = useState('Test Notification');
//   const [customBody, setCustomBody] = useState('This is a test notification body.');
//   const [customData, setCustomData] = useState('');

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

//     if (Platform.OS === 'android') {
//       Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
//     }
//     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//       setNotificationHistory(prev => [notification, ...prev]);
//       setModalVisible(true);
//     });

//     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
//       // You can handle navigation or other actions here
//       console.log('Notification response:', response);
//     });

//     return () => {
//       notificationListener.remove();
//       responseListener.remove();
//     };
//   }, []);

//   const clearHistory = () => setNotificationHistory([]);

//   const handleScheduleCustomNotification = async () => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: customTitle || 'No Title',
//           body: customBody || 'No Body',
//           data: customData ? { custom: customData } : {},
//         },
//         trigger: {
//           type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//           seconds: 2,
//         },
//       });
//       Alert.alert('Notification scheduled!');
//     } catch (e) {
//       Alert.alert('Error', e instanceof Error ? e.message : String(e));
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
//       <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Your expo push token:</Text>
//       <Text selectable style={{ marginBottom: 10 }}>{expoPushToken}</Text>
//       <Text>{`Channels: ${JSON.stringify(channels.map(c => c.id), null, 2)}`}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
//         <Text style={{ fontWeight: 'bold' }}>Latest Notification:</Text>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <View style={{ width: '100%', marginVertical: 10 }}>
//         <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Send Custom Notification (local):</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Title"
//           value={customTitle}
//           onChangeText={setCustomTitle}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Body"
//           value={customBody}
//           onChangeText={setCustomBody}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Data (optional)"
//           value={customData}
//           onChangeText={setCustomData}
//         />
//         <Button title="Schedule Notification" onPress={handleScheduleCustomNotification} />
//       </View>
//       <View style={{ width: '100%', marginVertical: 10 }}>
//         <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Notification History:</Text>
//         <FlatList
//           data={notificationHistory}
//           keyExtractor={(_, idx) => idx.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.historyItem}>
//               <Text style={{ fontWeight: 'bold' }}>{item.request.content.title}</Text>
//               <Text>{item.request.content.body}</Text>
//               <Text style={{ fontSize: 10, color: '#888' }}>{JSON.stringify(item.request.content.data)}</Text>
//             </View>
//           )}
//           ListEmptyComponent={<Text style={{ color: '#888' }}>No notifications received yet.</Text>}
//           style={{ maxHeight: 200 }}
//         />
//         <Button title="Clear History" onPress={clearHistory} color="#d9534f" />
//       </View>
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//           <View style={styles.modalContent}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Notification Received!</Text>
//             <Text>Title: {notification && notification.request.content.title}</Text>
//             <Text>Body: {notification && notification.request.content.body}</Text>
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 8,
//     marginBottom: 8,
//     width: '100%',
//   },
//   historyItem: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     padding: 8,
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     minWidth: 250,
//   },
// });

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here', test: { test1: 'more data' } },
//     },
//     trigger: {
//       type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//       seconds: 2,
//     },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('myNotificationChannel', {
//       name: 'A channel is needed for the permissions prompt to appear',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       Alert.alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     // EAS projectId is used here.
//     try {
//       const projectId =
//         Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//       if (!projectId) {
//         throw new Error('Project ID not found');
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(token);
//     } catch (e) {
//       token = `${e}`;
//     }
//   } else {
//     Alert.alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }
