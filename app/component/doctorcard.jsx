import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MyCalendar from "../component/calender";
const Dktcard = ({ specialist, name }) => {
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
              ellipsizeMode={"middle"}
            >
              Dr.{name}
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
        <View>
          <Text>Availability</Text>
        </View>
        <View style = {stylescard.AvadayDate}>
          <View style = {stylescard.shape}>
            <Text>Mon</Text>
            <Text>13</Text>
          </View>
          <View>
            <Text>Tue</Text>
            <Text>14</Text>
          </View>
          <View>
            <Text>Wed</Text>
            <Text>15</Text>
          </View>
          <View>
            <Text>Thu</Text>
            <Text>16</Text>
          </View>
          <View>
            <Text>Fri</Text>
            <Text>17</Text>
          </View>
          <View>
            <Text>Sat</Text>
            <Text>18</Text>
          </View>
          <View>
            <Text>Sun</Text>
            <Text>19</Text>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity style={stylescard.booknowbtn}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "medium" }}>
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const stylescard = StyleSheet.create({

  shape:{
    backgroundColor:"rgba(0,0,0,0.2)",
    height:60,
    width:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:12,
    rowGap:12

  },
  AvadayDate: {
  flexDirection:"row",
  columnGap:15
  
},
Avacontainer: {
    width: "100%",
    backgroundColor: "transparent",

  },
  booknowbtncontainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  booknowbtn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2769ae",
    borderRadius: 20,
  },
  Cardcontainer: {
    flex: 1,
    backgroundColor: "#d0f0c0",
    width: "95%",
    padding: 12,
    borderRadius: 15,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain", // Adjusts image scaling mode
  },
  //   always view component is flex so there is no need to write flex
  cardsides: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  handlespecialist: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: 100,
    height: 20,
    borderRadius: 4,
    marginBottom: 12,
  },
  handlename: {
    width: 200,
    borderRadius: 4,
  },

  dktname: {
    color: "white",
    fontSize: 20,
  },
  Specialist: {
    color: "white",
    fontSize: 10,
  },
});

export default Dktcard;
