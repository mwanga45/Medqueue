import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Touchable, TouchableOpacity, Modal, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import UserRegistration from "./component/userRegistration";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { apiurl } from './request_response';
export default function Login() {
    const [isReg, setisReg] = useState<boolean>(true)
    const [loginreq, setLoginreq] = useState({
        secretekey:"",
        email:""
    })
    const [isClosed, setClosed] = useState(true);
    const [isVerfy, setisVerfy] = useState<boolean | null>(null);
   const handleonchange = (fieldname:string, value:string) =>{
    setLoginreq((prev)=>({
        ...prev,[fieldname]:value
    }))
   }
   const router = useRouter()
    const handleLogin = async() =>{
        try{   
            console.log(loginreq)      
            await  AsyncStorage.setItem('userToken','')    
            const res = await axios.post(apiurl+"auth/login",loginreq)
            if (res.data.success === false){
                Alert.alert(res.data.message)
                return
            }
            const Token = res.data.token
            await AsyncStorage.setItem('userToken', Token);
           router.push('/home')

        }catch(err){
            console.error("something went wrong",err)
        }
    }
    return (

        <GestureHandlerRootView>
            <ScrollView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text}>Hello welcome Again! <Icon name="smile" size={30} color /></Text>
                </View>
                <View style={styles.formcontainer}>
                    <View style={styles.switchContainer}>
                        <TouchableOpacity style={styles.switchBtn} onPress={() => setisReg(true)}>
                            <Text>login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.switchBtn} onPress={() => setisReg(false)}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView>
                        {isReg === true ? (
                            <View style={styles.form}>
                                <View style={styles.textInput}>
                                    <Icon name="envelope" size={20} />
                                    <TextInput style={{ width: "100%", height: 40 }} placeholder='.....@gmail.com' value={loginreq.email} onChangeText={(text)=>handleonchange("email",text)}></TextInput>
                                </View>
                                <View style={styles.textInput}>
                                    <Icon name="lock" size={20} />
                                    <TextInput style={{ width: "100%", height: 40 }} placeholder='Secretekey' value={loginreq.secretekey} onChangeText={(text)=>handleonchange("secretekey",text)}></TextInput>
                                </View>
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity style={styles.btn} onPress={handleLogin} >
                                        <Text>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <Modal
                                
                                onRequestClose={() => setisReg(!isReg)}
                                animationType="slide"
                            >
                                <View
                                    style={{
                                        backgroundColor: "#05992C",
                                        flex: 1,
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    <Ionicons name="medical" size={100} color="white" />
                                    <UserRegistration />
                                </View>
                            </Modal>

                        )
                        }
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    title: {
        // width: width,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        marginTop: height * 0.05,
        marginBottom: height * 0.1
    },
    switchContainer: {
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
        columnGap: 5,
        backgroundColor: "whitesmoke",
        justifyContent: "space-evenly",
        paddingHorizontal: 5,
        height: 80
    },
    switchBtn: {
        width: "45%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "white"

    },
    formcontainer: {
        height: height * 0.8,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,


    },
    text: {
        fontSize: 30,
        color: "white",
        fontWeight: "800",
    },
    form: {
        flexDirection: "column",
        rowGap: 30,
        marginTop: 70
        //    backgroundColor:"black"
    },
    textInput: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        alignItems: "center",
        columnGap: 5
    },
    btnContainer: {
        flexDirection: "row",
        height: 80,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        borderWidth: 1,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "rgb(6, 112, 179)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }


})
