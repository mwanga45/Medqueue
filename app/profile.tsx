import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get("window")
export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 0 }}>
      <View style={styles.upperView}>
        <View>
          <Text style={{ fontSize: 19, fontWeight: 500, textAlign: 'center', marginTop: 20, color: "white" }}>Your Profile</Text>
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


  }
})


