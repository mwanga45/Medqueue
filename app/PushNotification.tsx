// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, Platform, Alert } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import axios from 'axios';
// import { apiurl } from './request_response';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function PushNotification() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState<any>(null);
//   const notificationListener = useRef<any>();
//   const responseListener = useRef<any>();
//   const [tokenRegistered, setTokenRegistered] = useState(false);

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => {
//       if (token) setExpoPushToken(token);
//       console.log(token)
//     });

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
//       if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   // Send token to backend when it is set
//   useEffect(() => {
//     const sendTokenToBackend = async () => {
//       if (expoPushToken) {
//         try {

//           await axios.post(apiurl + 'user/register-push-token', {
//             deviceId: expoPushToken,
//           });
//           console.log(expoPushToken)
//           setTokenRegistered(true);
//         } catch (err) {
//           setTokenRegistered(false);
//           console.log('Failed to register token with backend', err);
//         }
//       }
//     };
//     sendTokenToBackend();
//   }, [expoPushToken]);

//   const triggerTestNotification = async () => {
//     if (!expoPushToken) {
//       Alert.alert('No Expo push token available!');
//       return;
//     }
//     try {
//       await axios.post(apiurl + 'user/test-push', {
//         deviceId: expoPushToken,
//       });
//       Alert.alert('Test notification triggered!');
//     } catch (err) {
//       const errorMsg = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : '';
//       Alert.alert('Failed to trigger notification', errorMsg);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Expo Push Notification Demo</Text>
//       <Text>Your Expo Push Token:</Text>
//       <Text selectable style={{ margin: 10, color: 'blue' }}>{expoPushToken}</Text>
//       {tokenRegistered ? (
//         <Text style={{ color: 'green' }}>Token registered with backend!</Text>
//       ) : null}
//       <Text>Last Notification:</Text>
//       {notification ? (
//         <View style={{ marginTop: 10, padding: 10, backgroundColor: '#e0f7fa', borderRadius: 8 }}>
//           <Text>Title: {notification.request.content.title}</Text>
//           <Text>Body: {notification.request.content.body}</Text>
//         </View>
//       ) : (
//         <Text>No notification received yet.</Text>
//       )}
//       {/* Add test notification button */}
//       <Button
//         title="Send Test Notification"
//         onPress={triggerTestNotification}
//       />
//     </View>
//   );
// }


// async function registerForPushNotificationsAsync() {
//   let token;
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
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('Expo push token:', token);
//   } else {
//     Alert.alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Platform, Alert, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';
import { apiurl } from './request_response';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PushNotification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [tokenRegistered, setTokenRegistered] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('undetermined');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    registerForPushNotificationsAsync();
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && 
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && 
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      console.log('[DEBUG] Starting push registration...');
      
      // Check if running on a physical device
      if (!Device.isDevice) {
        const emulatorWarning = 'Must use physical device for Push Notifications';
        console.warn(emulatorWarning);
        setErrorMessage(emulatorWarning);
        return;
      }

      // Check permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      setPermissionStatus(existingStatus);
      console.log(`[DEBUG] Initial permission status: ${existingStatus}`);

      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        console.log('[DEBUG] Requesting notification permissions...');
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        setPermissionStatus(status);
        console.log(`[DEBUG] Permission request result: ${status}`);
      }

      if (finalStatus !== 'granted') {
        const permissionError = 'Permission not granted for notifications';
        console.error(permissionError);
        setErrorMessage(permissionError);
        return;
      }

      // Get push token
      console.log('[DEBUG] Fetching Expo push token...');
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      console.log(`[DEBUG] Expo push token: ${token}`);
      setExpoPushToken(token);
      setErrorMessage('');

      // Android-specific configuration
      if (Platform.OS === 'android') {
        console.log('[DEBUG] Configuring Android channel...');
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } catch (error) {
      console.error('[ERROR] Push registration failed:', error);
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
      setErrorMessage(`Registration failed: ${errorMsg}`);
    }
  };

  // Send token to backend
  useEffect(() => {
    const registerToken = async () => {
      if (!expoPushToken) return;
      
      try {
        console.log(`[DEBUG] Registering token with backend: ${expoPushToken}`);
        await axios.post(apiurl + 'user/register-push-token', {
          deviceId: expoPushToken,
        });
        setTokenRegistered(true);
        console.log('[DEBUG] Token registered successfully');
      } catch (err) {
        setTokenRegistered(false);
        console.error('[ERROR] Token registration failed:', err);
        setErrorMessage('Backend registration failed');
      }
    };
    
    registerToken();
  }, [expoPushToken]);

  const triggerTestNotification = async () => {
    if (!expoPushToken) {
      Alert.alert('No Expo push token available!');
      return;
    }
    try {
      await axios.post(apiurl + 'user/test-push', {
        deviceId: expoPushToken,
      });
      Alert.alert('Test notification triggered!');
    } catch (err) {
      const errorMsg = (err as any)?.message || 'Unknown error';
      Alert.alert('Failed to trigger notification', errorMsg);
    }
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
        Push Notification Setup
      </Text>
      
      {errorMessage ? (
        <View style={{ backgroundColor: '#ffebee', padding: 15, borderRadius: 8, marginBottom: 15 }}>
          <Text style={{ color: '#b71c1c', fontWeight: 'bold' }}>Error:</Text>
          <Text style={{ color: '#b71c1c' }}>{errorMessage}</Text>
          {permissionStatus === 'denied' && (
            <Button
              title="Open Settings"
              onPress={openAppSettings}
              color="#3f51b5"
            />
          )}
        </View>
      ) : null}

      <Text>Permission Status: {permissionStatus}</Text>
      
      <Text style={{ marginTop: 15 }}>Your Expo Push Token:</Text>
      <Text selectable style={{ 
        margin: 10, 
        padding: 10,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        color: expoPushToken ? 'black' : '#9e9e9e'
      }}>
        {expoPushToken || 'No token available'}
      </Text>
      
      {tokenRegistered ? (
        <Text style={{ color: 'green', marginBottom: 10 }}>Token registered with backend!</Text>
      ) : null}
      
      <View style={{ flexDirection: 'row', marginVertical: 15 }}>
        <Button
          title="Retry Registration"
          onPress={registerForPushNotificationsAsync}
          disabled={permissionStatus === 'granted' && !!expoPushToken}
        />
        <View style={{ width: 10 }} />
        <Button
          title="Send Test Notification"
          onPress={triggerTestNotification}
          disabled={!expoPushToken}
        />
      </View>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Last Notification:</Text>
      {notification ? (
        <View style={{ marginTop: 10, padding: 10, backgroundColor: '#e0f7fa', borderRadius: 8 }}>
          <Text>Title: {notification.request.content.title}</Text>
          <Text>Body: {notification.request.content.body}</Text>
        </View>
      ) : (
        <Text style={{ marginTop: 10 }}>No notification received yet.</Text>
      )}
    </View>
  );
}