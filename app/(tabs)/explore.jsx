import React,{useEffect,useState} from 'react';
import { StyleSheet,FlatList,Text, View} from 'react-native';
import Dklistcard from "../component/doctorlistcard";
import Dktcard from "../component/doctorcard"
import Navigationbar from "../component/navigation"
import ServiceAvailablecomp from "../component/serviceAvailablecomp"




export default function TabTwoScreen() {
    const [timeSlots, setTimeSlots] = useState([]);
  
    useEffect(() => {
      generateTimeSlots();
    }, []);
  
    const generateTimeSlots = () => {
      const slots = [];
      const startTime = new Date();
      startTime.setHours(6, 30, 0, 0);
      const endTime = new Date();
      endTime.setHours(20, 30, 0, 0);
  
      const currentTime = new Date(startTime);
      while (currentTime <= endTime) {
        // Format the time as "HH:MM AM/PM"
        slots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        // Increment by 10 minutes
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
      setTimeSlots(slots);
    };
  return (
    <View style= {teststyle.maintest}>
        {/* <Dklistcard/> */}
        {/* <Dktcard name={"Paul Solm"} specialist={"Therapist"}/> */}
        <ServiceAvailablecomp/>
        <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={timeSlots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, paddingVertical: 4 }}>{item}</Text>
        )}
      />
    </View>

        <Navigationbar/>
    </View>
    )
  }
  const teststyle = StyleSheet.create({
    maintest:{
      flex:1,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center"
    }
  })