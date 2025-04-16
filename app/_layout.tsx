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
      </Stack>
    </>
  );
}
