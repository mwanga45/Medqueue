import React from "react"
import DeviceInfo from "react-native-device-info"

export  async function getDeviceId():Promise<string>{
    try{
        const uniqId = await DeviceInfo.getUniqueId()
        return uniqId
    }catch(err){
        console.error("something went wrong here",err)
        throw err
    }
}