import React from "react";
import { View, Text, Modal,Image } from "react-native";

const Viewdetails = () => {
  return (
    <Modal>
      <View>
        <View>
            <Image source={require("../../assets/images/favicon.png")} resizeMethod="resize"></Image>
        </View>
        <View>
          <Text>My details here</Text>
          <Text>Username: </Text>
          <Text>Phone_Number: </Text>
          <Text>Home Address: </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Viewdetails;
