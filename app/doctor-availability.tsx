import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";


const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    available: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    available: false,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    available: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Dermatologist",
    available: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "Oncologist",
    available: false,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Orthopedist",
    available: true,
    rating: 4.4,
  },
];

export default function DoctorAvailability() {
  const router = useRouter();
  const [filter, setFilter] = useState("all"); 

  const filteredDoctors =
    filter === "all"
      ? doctors
      : filter === "available"
      ? doctors.filter((doctor) => doctor.available)
      : doctors.filter((doctor) => !doctor.available);

  const availableCount = doctors.filter((doctor) => doctor.available).length;
  const unavailableCount = doctors.filter((doctor) => !doctor.available).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Availability</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{doctors.length}</Text>
          <Text style={styles.statLabel}>Total Doctors</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#4CAF50" }]}>
          <Text style={styles.statNumber}>{availableCount}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#f44336" }]}>
          <Text style={styles.statNumber}>{unavailableCount}</Text>
          <Text style={styles.statLabel}>Unavailable</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "available" && styles.activeFilter,
          ]}
          onPress={() => setFilter("available")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "available" && styles.activeFilterText,
            ]}
          >
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "unavailable" && styles.activeFilter,
          ]}
          onPress={() => setFilter("unavailable")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "unavailable" && styles.activeFilterText,
            ]}
          >
            Unavailable
          </Text>
        </TouchableOpacity>
      </View>

      {/* Doctor List */}
      <ScrollView style={styles.doctorList}>
        {filteredDoctors.map((doctor) => (
          <View key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFC107" />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              <View
                style={[
                  styles.availabilityIndicator,
                  { backgroundColor: doctor.available ? "#4CAF50" : "#f44336" },
                ]}
              >
                <Text style={styles.availabilityText}>
                  {doctor.available ? "Available" : "Unavailable"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 40,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  statCard: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 16,
    width: (width - 48) / 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#e0e0e0",
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
  },
  filterText: {
    color: "#757575",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },
  doctorList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#757575",
  },
  availabilityContainer: {
    marginLeft: 16,
  },
  availabilityIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  availabilityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
