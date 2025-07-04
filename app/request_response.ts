import axios from "axios" 
import { Alert } from "react-native"
import DeviceInfo from "react-native-device-info"
export const apiurl  = "http://192.168.186.123:8801/" 
// export const apiurl  = "http://172.21.151.38:8801/"


export const handlegetdeviceId = async(apiurl:string,devicestate: any, setdeviceId: any): Promise<string> =>{
    const deviceId =  await DeviceInfo.getUniqueId()
    try{
        // const res = await axios.post(apiurl+"verifyuse",{deviceId})
        const res = await axios.post(apiurl + "verifyuser", { deviceId }); 

        if (!res.data.success){
            Alert.alert(res.data.message || "Something went wrong")
            let err =  res.data.message
            return  err
        }

    }catch(err){
        Alert.alert("Something went wrong here")
        console.error("Something went wrong here", err)
    }
    
     setdeviceId(deviceId)
    return  deviceId
}