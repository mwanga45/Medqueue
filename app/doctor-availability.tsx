import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import {apiurl} from "./request_response"

type Doctor = {
  fullname: string;       
  specialty: string;     
  timeinterval: string;   
  rating: string;
  isAvailable: boolean;   
};


export default function DoctorAvailability() {
  const [filterstatus, setfilterstatus] = useState<
    "unavailable" | "available" | "all"
  >("all");
  const [doctors, setdoctors] = useState<any>([]);
  const handledoctorlist = async () => {
    try{
      const response = await axios.get(
        apiurl+"info/docAv"
      )
      if (!response.data.success){
        Alert.alert(response.data.message)
        console.error("something went wrong",response.data.message)
        return
      }
      const docs : Doctor[]= response.data.data
     setdoctors(docs)
    }
  catch (err){
    console.error("something went wrong here ",err)
    Alert.alert("Network error", "Unable to reach server");
  }
  };
  const totalCount = doctors.length;
  const Available = doctors.filter((a: Doctor) => a.isAvailable).length;
  const countNotAvailable = totalCount - Available

  const dispaly  = doctors.filter((d:Doctor)=> {
    if (filterstatus === 'available') return d.isAvailable
    if (filterstatus === 'unavailable') return !d.isAvailable
    return true
  })

  useEffect(() => {
    handledoctorlist();
  }, []);

  const router = useRouter();
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
          <Text style={styles.statNumber}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total Doctors</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#4CAF50" }]}>
          <Text style={styles.statNumber}>{Available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#f44336" }]}>
          <Text style={styles.statNumber}>{countNotAvailable}</Text>
          <Text style={styles.statLabel}>Unavailable</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterstatus === "all" && styles.activeFilter]}
          onPress={() => setfilterstatus("all")}
        >
          <Text
            style={[
              styles.filterText,
              filterstatus === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterstatus === "available" && styles.activeFilter,
          ]}
          onPress={() => setfilterstatus("available")}
        >
          <Text
            style={[
              styles.filterText,
              filterstatus === "available" && styles.activeFilterText,
            ]}
          >
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterstatus === "unavailable" && styles.activeFilter,
          ]}
          onPress={() => setfilterstatus("unavailable")}
        >
          <Text
            style={[
              styles.filterText,
              filterstatus === "unavailable" && styles.activeFilterText,
            ]}
          >
            Unavailable
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.doctorList}>
        {dispaly.map((doctor:any, idx:number) => (
          <View key={idx} style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.fullname}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.speciality}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFC107" />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              <View
                style={[
                  styles.availabilityIndicator,
                  { backgroundColor: doctor.isAvailable ? "#4CAF50" : "#f44336" },
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
