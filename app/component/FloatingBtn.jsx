// import React, { useState } from 'react';

// import { View, Text,  TouchableOpacity, StyleSheet,Animated } from 'react-native';
// import Icon  from  "react-native-vector-icons/FontAwesome5"

// const FloatingBtn = () => {
//     const [icon_1] = useState(new Animated.Value(40));
//     const [icon_2] = useState(new Animated.Value(40));
//     const [icon_3] = useState(new Animated.Value(40));
//     const [icon_4] = useState(new Animated.Value(40));

//     const [Pop,setPop] = useState(false)

//     const PopIn = ()=>{
//         setPop(true);
//         Animated.timing(icon_1,{
//           toValue:40,
//           duration:900,
//           useNativeDriver:false
//         }

//         )
//         Animated.timing(icon_2,{
//           toValue:40,
//           duration:900,
//           useNativeDriver:false
//         }

//         )
//         Animated.timing(icon_3,{
//           toValue:40,
//           duration:900,
//           useNativeDriver:false
//         }

//         )
//         Animated.timing(icon_4,{
//           toValue:40,
//           duration:900,
//           useNativeDriver:false
//         }

//         )
//     }
//     const PopOut = ()=>{
//       setPop(false);
//       Animated.timing(icon_1,{
//         toValue:40,
//         duration:900,
//         useNativeDriver:false
//       })
//       Animated.timing(icon_2,{
//         toValue:40,
//         duration:900,
//         useNativeDriver:false
//       })
//       Animated.timing(icon_3,{
//         toValue:40,
//         duration:900,
//         useNativeDriver:false
//       })
//       Animated.timing(icon_4,{
//         toValue:40,
//         duration:900,
//         useNativeDriver:false
//       })
//     }
//     return (
//     <View>
//         <Animated.View style = {[btnstyles.circle, {bottom:icon_1}]}>
//           <Icon name='user'size={25} color= "white"/>
//         </Animated.View>
//         <Animated.View style = {[btnstyles.circle, {bottom:icon_2, right:icon_2}]}>
//           <Icon name='stethoscope'size={25} color= "white"/>
//         </Animated.View>
//         <Animated.View style = {[btnstyles.circle, {right:icon_3}]}>
//           <Icon name='calender-check'size={25} color= "white"/>
//         </Animated.View>
//         <Animated.View style = {[btnstyles.circle, {bottom:icon_4, top:icon_4}]}>
//           <Icon name='sign-out-alt'size={25}color= "white"/>
//         </Animated.View>
//       <TouchableOpacity style= {btnstyles.circle} onPress={()=>{
//         {Pop === false? PopIn() : PopOut()} 
//       }}>
//       <Icon name='plus' size={25} color = "white"/>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const btnstyles = StyleSheet.create({
//     circle:{
//       backgroundColor: '#f52d56',
//       width: 60,
//       height: 60,
//       position: 'absolute',
//       bottom: 80,
//       right: 80,
//       borderRadius: 50,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }
// })
// export default FloatingBtn;
import React, { useState} from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FloatingButton = () => {

  const [icon_1] = useState(new Animated.Value(540));
  const [icon_2] = useState(new Animated.Value(540));
  const [icon_3] = useState(new Animated.Value(540));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return(
    <View style={{
      flex: 1
    }}>
      <Animated.View style={[styles.circle, { bottom: icon_1}]}>
        <TouchableOpacity>
          <Icon name="cloud-upload" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity>
          <Icon name="print" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icon_3}]}>
        <TouchableOpacity>
          <Icon name="share-alt" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
     backgroundColor: '#f52d56',
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 540,
     right: 40,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
  }
})
