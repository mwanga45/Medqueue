import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedicAssign() {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveSchedule = () => {
    if (!doctorName || !patientName || !appointmentDate || !appointmentTime) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }

    const scheduleDetails = {
      doctorName,
      patientName,
      appointmentDate,
      appointmentTime,
      notes,
    };

  
    console.log('Saving schedule:', scheduleDetails);

    Alert.alert(
      'Schedule Saved',
      `Appointment for ${patientName} with ${doctorName} has been scheduled.`,
      [{ text: 'OK', onPress: clearForm }]
    );
  };

  const clearForm = () => {
    setDoctorName('');
    setPatientName('');
    setAppointmentDate('');
    setAppointmentTime('');
    setNotes('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollBg}>
        <LinearGradient colors={['green', 'green']} style={styles.gradientHeader}>
          <View style={styles.header}>
            <Text style={styles.title}>New Medication</Text>
          </View>
        </LinearGradient>
        <View style={styles.formCard}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Medical name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g.,Paracetamol"
                value={doctorName}
                onChangeText={setDoctorName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dosage</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g.,500gm"
                value={patientName}
                onChangeText={setPatientName}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.howoftenContainer}>
                <TouchableOpacity style={styles.routine}>
                  <Text>Once daily</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.routine}>
                  <Text>Twice daily</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.howoftenContainer}>
                <TouchableOpacity style={styles.routine}>
                  <Text> Three times daily</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.routine}>
                  <Text> Four times daily</Text>
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
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveSchedule}>
              <Text style={styles.saveButtonText}>Save Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginHorizontal:12

    
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:12,
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
});