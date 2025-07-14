import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Colors } from '../constants/Colors';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerBackTitle: "",
        title: "",
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
        animation: "slide_from_right",
        headerShown: false,
      }}>
        <Stack.Screen name="index" options={{
          headerShown: false,
          title: "",
          headerTitle: ""
        }} />
        <Stack.Screen name="home" options={{
          headerShown: false,
          title: "",
          headerBackTitle: ""
        }}/>
        <Stack.Screen name="doctor-availability" options={{
          headerShown: false,
          title: "",
          headerBackTitle: ""
        }}/>
        <Stack.Screen name="emergency" options={{
          headerShown: false,
          title: "",
          headerBackTitle: ""
        }}/>
        <Stack.Screen name="booking" options={{
          headerShown:false,
          title:"",
          headerBackTitle:"",
          contentStyle:{
           backgroundColor:"rgb(5, 157, 11)"
          }
          
        }}/>
        <Stack.Screen name="chatpage" options={{
          headerShown:false,
          title:"",
          headerBackTitle:"",
          contentStyle:{
            backgroundColor:"rgb(0,0,4)"
          }
        }}/>
        <Stack.Screen name="login" options={{
          headerShown:false,
          title:"",
          contentStyle:{
            backgroundColor:"rgb(0, 29, 19)",
          }
        }}/>
        <Stack.Screen name="Profile" options={{
          headerShown:false,
          title:"",
          headerBackTitle:"",
          contentStyle:{
            backgroundColor:"green",
            
          }
        }}/>
        {/* <Stack.Screen name="Push" /> */}
        <Stack.Screen name="medicAssign" options={{
          headerShown:false,
          title:"",
          headerBackTitle:"",
          contentStyle:{
            backgroundColor:"rgb(0,0,4)"
          }
        }} />
        < Stack.Screen name="PushNotification" /> 
        <Stack.Screen name="TestappNotification"/>
      </Stack>
    </>
  );
}
