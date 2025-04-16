import React, { useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import FloatingBtn from "./component/FloatingBtn"

useEffect(()=>{


},[])


export default function Home(){
return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MedQueue</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Hello world</Text>
      </View>
    </SafeAreaView>
)
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: height * 0.30,
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
});