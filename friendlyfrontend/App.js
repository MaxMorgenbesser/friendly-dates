import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginNav from './Navigation/LoginNav';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  
  return (
  <NavigationContainer initialRouteName = "test">
  
 <LoginNav/>
   
 </NavigationContainer>
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

