import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";

const Dktcard = ({ specialist, name }) => {
    // function that return  day of week
  const getDayName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };
//  function which return date of day
  const getDayNumber = (date) => {
    return date.getDate();
  };

  const today = new Date(); // return current date and time 
  const daysArray = Array.from({ length: 7 }, (_, index) => {
    const newDate = new Date(today); // new Date(today): Clone today's date to avoid modifying the original
    newDate.setDate(today.getDate() + index);
    return newDate;
  });

  return (
    <LinearGradient
      colors={["rgba(0,36,2,1)", "rgba(19,213,84,1)", "rgba(3,234,25,1)"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={stylescard.Cardcontainer}
    >
      <View style={stylescard.cardsides}>
        <View>
          <View style={stylescard.handlespecialist}>
            <Text style={stylescard.Specialist}>{specialist}</Text>
          </View>
          <View style={stylescard.handlename}>
            <Text
              style={stylescard.dktname}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              Dr. {name}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={stylescard.image}
          />
        </View>
      </View>

      <View style={stylescard.Avacontainer}>
        <View style={stylescard.availabilityHeader}>
          <Text style={stylescard.availabilityHeaderText}>Availability</Text>
        </View>
        
        {/* <BlurView
          intensity={Platform.OS === 'ios' ? 30 : 20}
          tint="light"
          style={stylescard.blurContainer}
        > */}
          <View style={stylescard.AvadayDate}>
            {daysArray.map((day, index) => (
              <View key={index} style={stylescard.avadayItem}>
                <View style={stylescard.glassDayContainer}>
                  <Text style={stylescard.dayText}>{getDayName(day)}</Text>
                  <Text style={stylescard.dateText}>{getDayNumber(day)}</Text>
                </View>
              </View>
            ))}
          </View>
        {/* </BlurView> */}
      </View>

      <View>
        <TouchableOpacity style={stylescard.booknowbtn}>
          <Text style={stylescard.booknowbtnText}>Booking Now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const stylescard = StyleSheet.create({
  AvadayDate: {
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-around",
  },
  Avacontainer: {
    width: "100%",
    backgroundColor: "transparent",
    marginVertical: 10,
  },
  availabilityHeader: {
    marginBottom: 12,
  },
  availabilityHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avadayItem: {
    marginHorizontal: 6,
    marginVertical: 4,
  },
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
    marginHorizontal: -4,
  },
  glassDayContainer: {
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.2)',
      android: 'rgba(255, 255, 255, 0.3)'
    }),
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  booknowbtn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(39, 105, 174, 0.9)",
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  booknowbtnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  Cardcontainer: {
    flex: 1,
    width: "95%",
    padding: 16,
    borderRadius: 24,
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardsides: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 16,
  },
  handlespecialist: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  handlename: {
    maxWidth: 200,
  },
  dktname: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  Specialist: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Dktcard;