import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Mock data for emergency types
const emergencyTypes = [
  { 
    id: '1', 
    title: 'Snake Bite', 
    description: 'Immediate medical attention required for snake bites',
    icon: 'snake',
    color: '#4CAF50',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '2', 
    title: 'Heart Attack', 
    description: 'Chest pain, shortness of breath, and discomfort',
    icon: 'heartbeat',
    color: '#f44336',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '3', 
    title: 'Stroke', 
    description: 'Sudden numbness, confusion, trouble speaking',
    icon: 'brain',
    color: '#2196F3',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '4', 
    title: 'Severe Allergic Reaction', 
    description: 'Difficulty breathing, swelling, hives',
    icon: 'allergies',
    color: '#FF9800',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '5', 
    title: 'Trauma', 
    description: 'Injuries from accidents, falls, or violence',
    icon: 'band-aid',
    color: '#9C27B0',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

export default function Emergency() {
  const router = useRouter();
  const [selectedEmergency, setSelectedEmergency] = useState<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    image: string;
  } | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const flatListRef = useRef<FlatList | null>(null);
  
  const handleEmergencySelect = (emergency: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    image: string;
  }) => {
    setSelectedEmergency(emergency);
    setDescription(emergency.description);
  };
  const handleQuickBooking = () => {
    // Here you would typically send the booking data to your backend
    if (!selectedEmergency) {
      alert('Please select an emergency type');
      return;
    }
    alert(`Emergency booking submitted for ${selectedEmergency.title}`);
    // Navigate back to home or to a confirmation page
    router.back();
  };
  const renderEmergencyItem = ({ item }: { item: typeof emergencyTypes[0] }) => (
    <TouchableOpacity 
      style={[
        styles.emergencyItem,
        selectedEmergency?.id === item.id && styles.selectedEmergencyItem
      ]}
      onPress={() => handleEmergencySelect(item)}
    >
      <View style={[styles.emergencyIconContainer, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={24} color="white" />
      </View>
      <View style={styles.emergencyTextContainer}>
        <Text style={styles.emergencyTitle}>{item.title}</Text>
        <Text style={styles.emergencyDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Booking</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Emergency Type Selection */}
        <View style={styles.emergencyTypeContainer}>
          <Text style={styles.sectionTitle}>Select Emergency Type</Text>
          <View style={styles.emergencyListContainer}>
            <FlatList
              ref={flatListRef}
              data={emergencyTypes}
              renderItem={renderEmergencyItem}
              keyExtractor={item => item.id}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              style={styles.emergencyList}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            />
          </View>
        </View>
        
        {/* Quick Booking Form */}
        <View style={styles.bookingForm}>
          <Text style={styles.sectionTitle}>Quick Booking</Text>
          
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
              selectionColor="#f44336"
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              selectionColor="#f44336"
              maxLength={15}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Icon name="map-marker-alt" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#999"
              selectionColor="#f44336"
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Icon name="info-circle" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
              selectionColor="#f44336"
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              !selectedEmergency && styles.disabledButton
            ]}
            onPress={handleQuickBooking}
            disabled={!selectedEmergency}
          >
            <Text style={styles.submitButtonText}>Submit Emergency Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#f44336',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  emergencyTypeContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 10,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emergencyListContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  emergencyList: {
    maxHeight: 200,
  },
  emergencyItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedEmergencyItem: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  emergencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  bookingForm: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
}); 