import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';

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

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle notification response (e.g., navigation)
      console.log(response);
    });

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Send token to backend when it is set
  useEffect(() => {
    const sendTokenToBackend = async () => {
      if (expoPushToken) {
        try {
          // Replace with your backend endpoint
          await axios.post('http://<YOUR_BACKEND_URL>/api/register-push-token', {
            deviceId: expoPushToken,
          });
          setTokenRegistered(true);
        } catch (err) {
          setTokenRegistered(false);
          console.log('Failed to register token with backend', err);
        }
      }
    };
    sendTokenToBackend();
  }, [expoPushToken]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Expo Push Notification Demo</Text>
      <Text>Your Expo Push Token:</Text>
      <Text selectable style={{ margin: 10, color: 'blue' }}>{expoPushToken}</Text>
      {tokenRegistered ? (
        <Text style={{ color: 'green' }}>Token registered with backend!</Text>
      ) : null}
      <Text>Last Notification:</Text>
      {notification ? (
        <View style={{ marginTop: 10, padding: 10, backgroundColor: '#e0f7fa', borderRadius: 8 }}>
          <Text>Title: {notification.request.content.title}</Text>
          <Text>Body: {notification.request.content.body}</Text>
        </View>
      ) : (
        <Text>No notification received yet.</Text>
      )}
    </View>
  );
}

// Helper to register for push notifications and get the token
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}