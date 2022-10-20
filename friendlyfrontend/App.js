import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginNav from './Navigation/LoginNav';
import { createContext,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './Navigation/AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const data = createContext()
export default function App() {
  const [uid,setUid] = useState()
  const [pin,setPin] = useState()
  const [user,setUser] = useState()
  const [tempToken,setTempToken] = useState()
  const [token, SetToken ] = useState(AsyncStorage.getItem("@token"))
  return (
    <data.Provider value={{setUid,uid,setTempToken,tempToken,pin, setPin, user,setUser, token,SetToken}}>
  <NavigationContainer initialRouteName = "test">
  {/* {token && console.log(token)} */}
 <LoginNav/>
 
 </NavigationContainer>
 </data.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

