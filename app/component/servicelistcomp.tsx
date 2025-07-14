import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { apiurl } from "../request_response";
import {
  ScrollView,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface incomingservice {
  id: string;
  servicename: string;
  consultationFee: any;
  created_at: string;
  duration_minutes: number;
}
interface requestedservice {
  servid:string;
  timeInter:number;
  servicename:string
}
interface SlotsInfo {
  doctorId:number;
  doctorName:string;
  servicename:string;
  start_time:string;
  end_time:string;
  day_of_week:string;
  date:string;
  duration_minutes:string;
  fee:number;
}

interface ServiceListProps {
  setModal: (visible: boolean) => void;
  onSelect: (service: {
    id: number;
    servicename: string;
    serviceprice: string;
  }) => void;
  setSlot:any
}


const Servicelistcomp: React.FC<ServiceListProps> = ({
  setModal,
  onSelect,
  setSlot,
}) => {
  const [service, setservice] = useState<incomingservice[]>([]);
  const [requestedserv, setrequestedserv] = useState<requestedservice>({
    servid:"",
    servicename:"",
    timeInter:0

  })
  const [slotResesult, setslotResult] = useState<SlotsInfo[]>([])
  const [selectedService, setselectedService] = useState<incomingservice>({
    id: "",
    servicename: "",
    consultationFee: "",
    created_at: "",
    duration_minutes: 0,
  });
  const [search, setsearch] = useState<string>(""); 
  const [loading, setLoading] = useState(false);
  const handleGetService = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.get(apiurl +"booking/getservice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.data.success) {
        Alert.alert(res.data.message);
        return;
      }
      setservice(res.data.data);
    } catch (err) {
      Alert.alert("something went wrong");
      console.error(err);
    }
  };

 
  const filteredServices = service.filter(item =>
    item.servicename.toLowerCase().includes(search.toLowerCase())
  );

  const OnHandleService = async (
    id: number,
    servicename: string,
    serviceprice: string,
    duration:number
  ) => {
    setLoading(true);
    const selection = { id, servicename, serviceprice };
    setselectedService(selection as any);
    onSelect(selection);
    const payload = {
      servid: id,
      servicename,
      timeInter:duration 
    } 
    try{
      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.post(apiurl+"booking/serviceslot", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.data.success){
        Alert.alert(res.data.message)
      }
      setSlot(res.data.data)
      setrequestedserv({
        servid:"",
        servicename:"",
        timeInter:0
      })
      
    }catch (err: any) {
  console.error("serviceslot error:", err.response?.status, err.response?.data);
  Alert.alert("Internal Server Error", err.response?.data?.message || err.message);
}
    setLoading(false);


    await Alert.alert(
      `${servicename}`,
      "Confirm this service to allow to progress with the process of booking",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setModal(true),
        },
        {
          text: "Ok",
          style: "default",
          onPress: () => setModal(false),
        },
      ]
    );
  };

  useEffect(() => {
    handleGetService();
  }, []);

  return (
    <GestureHandlerRootView style={stylesmodal.container}>
      {/* Loading Overlay */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={stylesmodal.loadingOverlay}>
          <BlurView intensity={90} tint="light" style={stylesmodal.absoluteFill} />
          <View style={stylesmodal.loadingContent}>
            <ActivityIndicator size="large" color="#43e97b" />
            <Text style={stylesmodal.loadingText}>Loading service details...</Text>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={["#43e97b", "#38f9d7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={stylesmodal.gradientHeader}
      >
        <Text style={stylesmodal.texttitleGradient}>Service Options for You!</Text>
        <View style={stylesmodal.underlineHighlight} />
      </LinearGradient>
      <View style={stylesmodal.searchpart}>
        <View style={stylesmodal.textinputcontainer}>
          <Ionicons name="search" color="#43e97b" size={22} style={{marginLeft: 10}} />
          <TextInput
            placeholder="Search for a service..."
            style={stylesmodal.input}
            onChangeText={setsearch}
            value={search}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
      <ScrollView style={stylesmodal.listcontainer} showsVerticalScrollIndicator={false}>
        {filteredServices.map(item => (
          <TouchableOpacity
            style={stylesmodal.listcover}
            key={item.id}
            activeOpacity={0.85}
            onPress={() => {
              if (!loading) {
                OnHandleService(
                  Number(item.id),
                  item.servicename,
                  String(item.consultationFee),
                  item.duration_minutes
                );
              }
            }}
          >
            <View style={stylesmodal.cardRow}>
              <Ionicons name="medkit" size={32} color="#43e97b" style={{marginRight: 12}} />
              <View style={{flex: 1}}>
                <Text style={stylesmodal.titlelist}>{item.servicename}</Text>
                <Text style={stylesmodal.amount}>{item.consultationFee} Tsh</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#38f9d7" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};


const { height } = Dimensions.get("window");

const stylesmodal = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#f8fefc',
  },
  gradientHeader: {
    height: height * 0.18,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 10,
    shadowColor: '#43e97b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  headingpart: { display: 'none' }, // Hide old header
  searchpart: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: height * 0.01,
    borderRadius: 25,
    shadowColor: "#218c4a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#43e97b",
  },
  listcontainer: {
    height: height * 0.67,
    width: "100%",
    backgroundColor: "#e6f9ed",
    marginTop: height * 0.01,
    borderRadius: 25,
    shadowColor: "#38f9d7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  texttitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  texttitleGradient: {
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: 'center',
    paddingHorizontal: 10,
    textShadowColor: '#43e97b',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    marginTop: 10,
    marginBottom: 6,
  },
  underlineHighlight: {
    width: 180,
    height: 7,
    backgroundColor: '#b6f5d8',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: 2,
    opacity: 0.7,
  },
  textinputcontainer: {
    backgroundColor: "#f4f4f4",
    width: "90%",
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    shadowColor: "#43e97b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    width: "85%",
    height: "100%",
    fontWeight: "500",
    fontSize: 18,
    paddingHorizontal: 12,
    color: '#222',
  },
  listcover: {
    width: "100%",
    minHeight: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#e0f7ef",
    borderWidth: 2.5,
    borderColor: "#43e97b",
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 4,
    padding: 16,
    shadowColor: "#218c4a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titlelist: {
    color: "#218c4a",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 2,
  },
  amount: {
    color: "#43e97b",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 2,
    height: 24,
  },
  Description: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 18,
    fontSize: 18,
    color: '#218c4a',
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default Servicelistcomp;
