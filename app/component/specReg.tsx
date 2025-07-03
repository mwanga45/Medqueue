import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiurl } from '../request_response';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Specreg() {
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('')
  const [secretKey, setSecretKey] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [Specreg, setSpecreg] = useState({
    firstname: "",
    secondname: "",
    secretKey: "",
    age: "",
    phone: "",
    description: ""
  })

  const handleSubmit = async () => {
    try {
      setSpecreg({
        firstname: firstname,
        secondname: secondname,
        secretKey: secretKey,
        age: age,
        phone: phone,
        description: description
      })
      const token = await AsyncStorage.getItem('userToken');
      const req = await axios.post(
        apiurl + "user/assignspec",
        Specreg,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      )
      if (req.data.success === false) {
        Alert.alert(req.data.message)
      }

    } catch (err) {
      Alert.alert("Something went wrong")
      console.error(err)
    }

  };
  useEffect(() => {
  }, [])

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollBg}>
        <LinearGradient colors={['#4A90E2', '#50C9C3']} style={styles.gradientHeader}>
          <Text style={styles.header}>Special Group Registration</Text>
        </LinearGradient>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Icon name="user" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Firstname"
              value={firstname}
              onChangeText={setFirstname}
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.inputGroup}>
            <Icon name="user" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Secondname"
              value={secondname}
              onChangeText={setSecondname}
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.inputGroup}>
            <Icon name="key" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Secret Key"
              secureTextEntry
              value={secretKey}
              onChangeText={setSecretKey}
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.inputGroup}>
            <Icon name="calendar" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.inputGroup}>
            <Icon name="phone" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="#666"
            />
          </View>
          <View style={[styles.inputGroup, styles.textAreaGroup]}>
            <Icon name="comment" size={20} style={styles.iconTop} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              <Icon name="paper-plane" size={18} color="#fff" />  Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollBg: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
    paddingBottom: 40,
  },
  gradientHeader: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 40,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 0,
    textAlign: 'center',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 5,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  icon: {
    marginRight: 10,
    color: '#4A90E2',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#50C9C3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#50C9C3',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  textAreaGroup: {
    paddingVertical: 10,
  },
  textArea: {
    height: 100,
  },
  iconTop: {
    marginRight: 10,
    marginTop: 12,
    color: '#4A90E2',
  },
});
