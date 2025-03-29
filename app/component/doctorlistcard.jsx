import React, { useState } from "react";
import Dktcard from "./doctorcard";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


const Dklistcard = ({ time, dkt_Name, Specialist }) => {
  const [showcard, setshowcard] = useState(false);
  return (
    <View style={styleslistcard.dklcontainer}>
      <View style={styleslistcard.dkAgment}>
        <View style={styleslistcard.imgdk}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styleslistcard.doctorImage}
          />
        </View>
        <View style={styleslistcard.infoContainer}>
          <Text style={styleslistcard.nameText}>{dkt_Name}</Text>
          <Text style={styleslistcard.specialtyText}>{Specialist}</Text>
          <Text style={styleslistcard.timeText}>{time} Scheduled</Text>
        </View>
        <TouchableOpacity 
          style={styleslistcard.IconArrow}
          onPress={() => setshowcard(true)}
        >
          <Icon name="chevron-right" size={20} style={styleslistcard.arrowIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showcard}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setshowcard(false)}
      >
        <TouchableOpacity 
          style={styleslistcard.modalOverlay}
          activeOpacity={1}
          onPress={() => setshowcard(false)}
        >
          <View style={styleslistcard.modalContent}>
            <Dktcard name={dkt_Name} specialist={Specialist}/>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styleslistcard = StyleSheet.create({
  dklcontainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#f4f4f4",
    padding: 8,
    width: "95%",
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  dkAgment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imgdk: {
    backgroundColor: "#d7dfe7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 90,
    height: 80,
  },
  doctorImage: {
    height: 50,
    width: 60,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  specialtyText: {
    fontSize: 14,
    color: "#555555",
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "grey",
    marginTop: 8,
  },
  IconArrow: {
    padding: 8,
    marginRight: 8,
  },
  arrowIcon: {
    color: "#808080",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "85%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});

export default Dklistcard;