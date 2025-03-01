import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Searchcomp = ({ placeholder }) => {
  const [search, setsearch] = useState("");
  const handlesearch = (text) => {
    setsearch(text);
  };
  return (
    <View>
      <View style={searchstyles.searchcontainer}>
        <TextInput
          style={searchstyles.inputsearchstyles}
          placeholder={placeholder}
          onChangeText={handlesearch}
          value={search}
        />
        <TouchableOpacity>
          <Icon name="search" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const searchstyles = StyleSheet.create({
  searchcontainer: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#e1e1e1",
    backgroundColor: "#f0f0f0",
    height: 60,
    borderRadius: 23,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  inputsearchstyles: {
    width: "85%",
  },
});

export default Searchcomp;
