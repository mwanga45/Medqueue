import React, { useState } from 'react';

import { View, Text,  TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated/lib/typescript';
import Icon  from  "react-native-vector-icons/FontAwesome5"

const FloatingBtn = () => {
    const [icon_1] = useState(new Animated.Value(40));
    const [icon_2] = useState(new Animated.Value(40));
    const [icon_3] = useState(new Animated.Value(40));
    const [icon_4] = useState(new Animated.Value(40));

    const [Pop,setPop] = useState(false)

    const PopIn = ()=>{
        setPop(true);
        Animated.timing(icon_1,{
          toValue:40,
          duration:900,
          useNativeDriver:false
        }

        )
        Animated.timing(icon_2,{
          toValue:40,
          duration:900,
          useNativeDriver:false
        }

        )
        Animated.timing(icon_3,{
          toValue:40,
          duration:900,
          useNativeDriver:false
        }

        )
        Animated.timing(icon_4,{
          toValue:40,
          duration:900,
          useNativeDriver:false
        }

        )
    }
    const PopOut = ()=>{
      setPop(false);
      Animated.timing(icon_1,{
        toValue:40,
        duration:900,
        useNativeDriver:false
      })
      Animated.timing(icon_2,{
        toValue:40,
        duration:900,
        useNativeDriver:false
      })
      Animated.timing(icon_3,{
        toValue:40,
        duration:900,
        useNativeDriver:false
      })
      Animated.timing(icon_4,{
        toValue:40,
        duration:900,
        useNativeDriver:false
      })
    }
    return (
    <View>
        <Animated.View style = {[btnstyles.circle, {bottom:icon_1}]}>
          <Icon name='user'size={25} color= "white"/>
        </Animated.View>
        <Animated.View style = {[btnstyles.circle, {bottom:icon_2}]}>
          <Icon name='stethoscope'size={25} color= "white"/>
        </Animated.View>
        <Animated.View style = {[btnstyles.circle, {bottom:icon_3}]}>
          <Icon name='calender-check'size={25} color= "white"/>
        </Animated.View>
        <Animated.View style = {[btnstyles.circle, {bottom:icon_4}]}>
          <Icon name='sign-out-alt'size={25}color= "white"/>
        </Animated.View>
      <TouchableOpacity style= {btnstyles.circle} onPress={()=>{
        {Pop? PopOut: PopIn()} 
      }}>
      <Icon name='plus' size={25}/>
      </TouchableOpacity>
    </View>
  );
}
const btnstyles = StyleSheet.create({
    circle:{
      position:"absolute",
      bottom:50,
      width:100,
      height:100,
      borderRadius:"50%",
      right:30,
      justifyContent:"center",
      alignItems:"center"
    }
})
export default FloatingBtn;
