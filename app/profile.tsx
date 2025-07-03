import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get("window")
export default function Profile() {
  const  router  = useRouter()
  return (
    <SafeAreaView style={{flex:1 }}>
      <View style={styles.upperView}>
        <View style ={styles.viewbar} >
          <Text style={{ fontSize: 19, fontWeight: 500, textAlign: 'center', marginTop: 20, color: "white" }}>Your Profile</Text>
               <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="white" />
                  </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>


    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  upperView: {
    backgroundColor: "black",
    height: height * 0.5,
    borderRadius: 25,
    bottom: 0


  },
    backButton: {
    padding: 8,
  },
  viewbar :{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"

  }

})


