import { View,Text,SafeAreaView } from "react-native";
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
// import { launchImageLibrary} from 'react-native-image-picker'

export default function MyProfile (){
    const {token} = useContext(data)
    const [user,setUser] = useState()

    useEffect(()=>{
    if (token){
        setUser(jwtDecode(token))
    }
    },[token])
    return(<SafeAreaView>
        {user && console.log(user)}
        {token && console.log(token)}
        <Text>My profile is going here
            <View></View>

        {user && <View><Text>
            welcome {user.user.firstName}</Text></View>}

            
        </Text></SafeAreaView>)
}