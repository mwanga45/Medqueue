import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navigationbar from "../component/navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Booking = () => {
  return (
    <View style={bookingstyles.maincontainer}>
         <Ionicons name="medical" size={100} color="white" />
      <View style={bookingstyles.bkcontainer}>
        <View style={bookingstyles.Dperiod}>
          <View style={bookingstyles.period}>
            <Text style={bookingstyles.Dperiodname}>Morning</Text>
          </View>
          <View style={bookingstyles.period}>
            <Text style={bookingstyles.Dperiodname}>Afternoon</Text>
          </View>
          <View style={bookingstyles.period}>
            <Text style={bookingstyles.Dperiodname}>Evening</Text>
          </View>
          <View style={bookingstyles.period}>
            <Text style={bookingstyles.Dperiodname}>Night</Text>
          </View>
        </View>
        <View style={bookingstyles.bookng}>
          <View>
            <View style={bookingstyles.descriptiontxt}>
              <Icon name="calendar" size={20} style={{ color: "grey" }} />
              <Text style={{ color: "grey", fontSize: 16 }}>
                Select the meeting date
              </Text>
            </View>
            <View style={bookingstyles.Datebooking}>
              <View style = {bookingstyles.dateday}>
                <Text>2</Text>
                <Text>Mon</Text>
              </View>
              <View style = {bookingstyles.dateday}>
                <Text>2</Text>
                <Text>Mon</Text>
              </View>
              <View style = {bookingstyles.dateday}>
                <Text>2</Text>
                <Text>Mon</Text>
              </View>
              <View style = {bookingstyles.dateday}>
                <Text>2</Text>
                <Text>Mon</Text>
              </View>
            </View>
            <View style = {bookingstyles.timecontainer}>
               <Ionicons name="timer" size={20} style = {{color:"grey"}}/>
               <Text style ={{color:"grey"}}>Select time slot</Text>
            </View>
            <ScrollView horizontal= {true} style={bookingstyles.scrollslot} showsHorizontalScrollIndicator={true}>
            <View style = {bookingstyles.slottmt}>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
              <View style = {bookingstyles.slot}>
                <Text>12:30-12:45</Text>
              </View>
            </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <Navigationbar />
    </View>
  );
};

const bookingstyles = StyleSheet.create({
  scrollslot:{
    paddingHorizontal:1,
  },
  slot:{
    width:150,
    height:50,
    backgroundColor:"grey",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:13
    

  },
  slottmt:{
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    columnGap:32
  },
  timecontainer:{
    flexDirection:"row",
    alignItems:"center",
    columnGap:8,
    marginBottom:12
  },
  dateday:{
    backgroundColor:"#c5c5c5",
    width:70,
    height:90,
    justifyContent:"center",
    alignItems:"center",
    rowGap:12,
    borderRadius:12
  },
  Datebooking: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap:12,
    marginBottom:40
  },
  descriptiontxt: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    marginBottom: 12,
  },
  bookng: {
    width: "94%",
    backgroundColor: "#eff5ec",
    paddingHorizontal: 4,
    borderRadius: 23,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  Dperiodname: {
    fontSize: 17,
  },
  period: {
    backgroundColor: "white",
    width: 90,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 12,
  },
  Dperiod: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "#4CAF50",
    // paddingHorizontal:23
  },
  bkcontainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 89,
  },
});

export default Booking;
