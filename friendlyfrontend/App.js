import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginNav from './Navigation/LoginNav';
import { createContext,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './Navigation/AppNav';


export const data = createContext()
export default function App() {
  const [uid,setUid] = useState()
  const [pin,setPin] = useState()
  const [user,setUser] = useState()
  const [tempToken,setTempToken] = useState()

  return (
    
    <data.Provider value={{setUid,uid,setTempToken,tempToken,pin, setPin, user,setUser}}>
  <NavigationContainer initialRouteName = "test">
  
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

