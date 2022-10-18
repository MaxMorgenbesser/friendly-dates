import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Text } from "react-native";
import AddUser from "../Components/Adduser";
import Home from "../Components/Home";
import AppNav from "./AppNav";
// import { NavigationContainer } from "@react-navigation/native";
import Pin from "../Components/Pin";
const Stack = createNativeStackNavigator();

export default function LoginNav() {
  return (
    <Stack.Navigator initialRouteName="home"  options={{ headerShown: false }}>
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="pin" component={Pin} />
      <Stack.Screen name="App" component={AppNav} />
    </Stack.Navigator>
  
  );
}
