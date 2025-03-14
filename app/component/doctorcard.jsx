import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const Dktcard = ({ specialist, name }) => {
  const getDayName = (date) => date.toLocaleDateString("en-US", { weekday: "short" });
  const getDayNumber = (date) => date.getDate();

  const today = new Date();
  const daysArray = Array.from({ length: 7 }, (_, index) => {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + index);
    return newDate;
  });

  return (
    <LinearGradient
      colors={["#002402", "#13D554", "#03EA19"]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.cardTop}>
        <View style={styles.infoContainer}>
          <View style={styles.specialistContainer}>
            <Text style={styles.specialistText}>{specialist}</Text>
          </View>
          <Text style={styles.doctorName} numberOfLines={1} ellipsizeMode="tail">
             {name}
          </Text>
        </View>
        <Image source={require("../../assets/images/adaptive-icon.png")} style={styles.image} />
      </View>

      <View style={styles.availabilityContainer}>
        <Text style={styles.availabilityHeader}>Availability</Text>
        
        <BlurView intensity={Platform.OS === 'ios' ? 30 : 20} tint="light" style={styles.blurContainer}>
          <View style={styles.dayDateContainer}>
            {daysArray.map((day, index) => (
              <View key={index} style={styles.dayItem}>
                <View style={styles.glassDay}>
                  <Text style={styles.dayText}>{getDayName(day)}</Text>
                  <Text style={styles.dateText}>{getDayNumber(day)}</Text>
                </View>
              </View>
            ))}
          </View>
        </BlurView>
      </View>

      <TouchableOpacity style={styles.bookNowButton}>
        <Text style={styles.bookNowButtonText}>Booking Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    padding: 16,
    borderRadius: 24,
    margin: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  infoContainer: {
    maxWidth: "65%",
  },
  specialistContainer: {
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  specialistText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  availabilityContainer: {
    width: "100%",
    marginVertical: 10,
  },
  availabilityHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  blurContainer: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 12,
  },
  dayDateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  dayItem: {
    marginHorizontal: 6,
  },
  glassDay: {
    backgroundColor: Platform.select({
      ios: "rgba(255, 255, 255, 0.2)",
      android: "rgba(255, 255, 255, 0.3)",
    }),
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  dayText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bookNowButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(39, 105, 174, 0.9)",
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  bookNowButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
});

export default Dktcard;
