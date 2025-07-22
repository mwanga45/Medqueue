import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicAssign() {
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Load medications from storage on app start
  useEffect(() => {
    loadMedications();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please enable notifications for medication reminders.');
    }
  };

  const loadMedications = async () => {
    try {
      const savedMeds = await AsyncStorage.getItem('medications');
      if (savedMeds) setMedications(JSON.parse(savedMeds));
    } catch (error) {
      Alert.alert('Error', 'Failed to load medications');
    }
  };

  const saveMedication = async () => {
    if (!medName || !dosage || !frequency) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }

    const newMedication = {
      id: Date.now().toString(),
      medName,
      dosage,
      frequency,
      notes,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save to local storage
      const updatedMeds = [...medications, newMedication];
      await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
      setMedications(updatedMeds);

      // Schedule notifications
      scheduleNotifications(newMedication);

      Alert.alert(
        'Medication Saved',
        `${medName} schedule has been saved successfully.`,
        [{ text: 'OK', onPress: clearForm }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save medication');
    }
  };

  const scheduleNotifications = async (medication) => {
    const { medName, dosage, frequency } = medication;
    const notificationTimes = calculateNotificationTimes(frequency);

    for (const time of notificationTimes) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Medication Reminder",
          body: `Time to take ${medName} (${dosage})`,
          sound: 'default',
        },
        trigger: {
          hour: time.hour,
          minute: time.minute,
          repeats: true,
        },
      });
    }
  };

  const calculateNotificationTimes = (freq) => {
    // Default times for each frequency
    const timesMap = {
      'Once daily': [{ hour: 8, minute: 0 }],
      'Twice daily': [{ hour: 8, minute: 0 }, { hour: 20, minute: 0 }],
      'Three times daily': [
        { hour: 8, minute: 0 },
        { hour: 14, minute: 0 },
        { hour: 20, minute: 0 }
      ],
      'Four times daily': [
        { hour: 6, minute: 0 },
        { hour: 12, minute: 0 },
        { hour: 18, minute: 0 },
        { hour: 22, minute: 0 }
      ],
    };
    return timesMap[freq] || [];
  };

  const clearForm = () => {
    setMedName('');
    setDosage('');
    setFrequency('');
    setNotes('');
  };

  const deleteMedication = async (id) => {
    try {
      const updatedMeds = medications.filter(med => med.id !== id);
      await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
      setMedications(updatedMeds);
      Alert.alert('Deleted', 'Medication schedule removed');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete medication');
    }
  };

  const renderMedicationItem = ({ item }) => (
    <View style={styles.medItem}>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{item.medName}</Text>
        <Text style={styles.medDetails}>{item.dosage} • {item.frequency}</Text>
        {item.notes ? <Text style={styles.medNotes}>Notes: {item.notes}</Text> : null}
      </View>
      <TouchableOpacity onPress={() => deleteMedication(item.id)}>
        <Ionicons name="trash" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollBg}>
        <LinearGradient colors={['green', 'green']} style={styles.gradientHeader}>
          <View style={styles.header}>
            <Text style={styles.title}>New Medication</Text>
            <TouchableOpacity 
              style={styles.viewScheduleButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.viewScheduleText}>View Schedule</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <View style={styles.formCard}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Medical name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Paracetamol"
                value={medName}
                onChangeText={setMedName}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dosage</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 500mg"
                value={dosage}
                onChangeText={setDosage}
              />
            </View>
            
            <Text style={[styles.label, { marginBottom: 12 }]}>How often?</Text>
            <View style={styles.row}>
              <View style={styles.howoftenContainer}>
                <TouchableOpacity 
                  style={[
                    styles.routine, 
                    frequency === 'Once daily' && styles.selectedRoutine
                  ]}
                  onPress={() => setFrequency('Once daily')}
                >
                  <Text>Once daily</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.routine, 
                    frequency === 'Twice daily' && styles.selectedRoutine
                  ]}
                  onPress={() => setFrequency('Twice daily')}
                >
                  <Text>Twice daily</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.howoftenContainer}>
                <TouchableOpacity 
                  style={[
                    styles.routine, 
                    frequency === 'Three times daily' && styles.selectedRoutine
                  ]}
                  onPress={() => setFrequency('Three times daily')}
                >
                  <Text>Three times daily</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.routine, 
                    frequency === 'Four times daily' && styles.selectedRoutine
                  ]}
                  onPress={() => setFrequency('Four times daily')}
                >
                  <Text>Four times daily</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any additional notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
            
            <TouchableOpacity style={styles.saveButton} onPress={saveMedication}>
              <Text style={styles.saveButtonText}>Save Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Medication Schedule Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Medication Schedule</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          
          {medications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="medical" size={60} color="#ddd" />
              <Text style={styles.emptyText}>No medications scheduled</Text>
            </View>
          ) : (
            <FlatList
              data={medications}
              renderItem={renderMedicationItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.medList}
            />
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  formCard: {
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
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  howoftenContainer: {
    flexDirection: "row"
  },
  routine: {
    width: 130,
    height: 105,
    backgroundColor: "#f4f4dd",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  viewScheduleButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  viewScheduleText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  medList: {
    padding: 15,
  },
  medItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  medDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  medNotes: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic',
    marginTop: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#bdc3c7',
    marginTop: 20,
  },
  selectedRoutine: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 1,
  },
});