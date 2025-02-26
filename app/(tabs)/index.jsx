import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const Entrypage = () => {
  const route = useRouter()
  const fadeAnim =  useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0.5)).current;
// having the animation once the page is mount and remove it after the page is unmount
useEffect(()=>{
  Animated.parallel([
    Animated.timing(fadeAnim,{
      toValue:1,
      duration:1000,
      useNativeDriver:true
    }),
    Animated.spring(bounceAnim, {
      toValue:1,
      tension:10,
      friction:2,
      useNativeDriver:true
    })
  ]).start()

  const Timer = setInterval(()=>{
    route.replace("/authentic")
  },2000)

  return  ()=> clearInterval(Timer)

},[])

  return (
     <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: bounceAnim }],
          },
        ]}
      >
        <Ionicons name="medical" size={100} color="white" />
        <Text style={styles.appName}>MedQueue</Text>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  appName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 1,
  },
});
export default Entrypage;
