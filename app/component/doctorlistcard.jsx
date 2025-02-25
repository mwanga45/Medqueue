import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Platform 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get('window');

const Dklistcard = () => {
  return (
    <TouchableOpacity style={styleslistcard.dklcontainer}>
      <View style={styleslistcard.dkAgment}>
        {/* Image Container */}
        <View style={styleslistcard.imgdk}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styleslistcard.image}
            resizeMode="contain"
          />
        </View>
        
        {/* Text Content */}
        <View style={styleslistcard.contentContainer}>
          <Text style={styleslistcard.title}>Dr. Jenny Wilson</Text>
          <Text style={styleslistcard.subtitle}>Bone Health</Text>
          <Text style={styleslistcard.timeText}>
            10:25 AM - 11:25 AM Scheduled
          </Text>
        </View>

        {/* Icon */}
        <View style={styleslistcard.IconArrow}>
          <Icon name="chevron-right" size={width * 0.05} style={styleslistcard.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styleslistcard = StyleSheet.create({
  dklcontainer: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: width * 0.025,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dkAgment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgdk: {
    backgroundColor: "#d7dfe7",
    borderRadius: 8,
    width: width * 0.2,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 4,
  },
  timeText: {
    fontSize: width * 0.03,
    color: 'grey',
    fontWeight: '400',
  },
  IconArrow: {
    marginLeft: 10,
  },
  icon: {
    color: '#888',
  },
});

export default Dklistcard;