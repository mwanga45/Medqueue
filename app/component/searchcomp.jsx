import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Searchcomp = () => {
  const [search, setsearch] = useState("");
  const handlesearch = (e) => {
    setsearch(e.target.value)
  };
  return (
    <View>
      <View style={searchstyles.searchcontainer}>
        <TextInput
          style={searchstyles.inputsearchstyles}
          placeholder="search for doctor"
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
    backgroundColor: "#e1e1e1",
    height: 60,
    borderRadius: 23,

  },
  inputsearchstyles: {
    width: "85%",
  },
});

export default Searchcomp;
