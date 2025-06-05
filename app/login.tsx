import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
export default function Login() {
    return (
        
            <GestureHandlerRootView> 
                <ScrollView style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.text}>Hello welcome Again! <Icon name="smile" size={30} color /></Text>
                    </View>
                    <View style={styles.formcontainer}>
                        <KeyboardAvoidingView>
                        <View>
                            <TextInput></TextInput>
                        </View>
                        <View>
                            <TextInput></TextInput>
                        </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </GestureHandlerRootView> 
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 12,
    },
    title: {
        // width: width,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        marginTop: height*0.05,
        marginBottom:height*0.1
    },
    formcontainer: {
        height:height*0.8,
        backgroundColor:"white",
        borderRadius:10,


    },
    text: {
        fontSize: 30,
        color: "white",
        fontWeight: "800",
    },

})