import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

const UserDetails = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="times" size={22} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.userProfile}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.username}>LynxPraoofue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    top: "30%",
    backgroundColor: "#2c3e50",
    width: width * 0.7,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    alignSelf:"flex-end",
    padding: 8,
    marginBottom: 16,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    color: "#ecf0f1",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default UserDetails;