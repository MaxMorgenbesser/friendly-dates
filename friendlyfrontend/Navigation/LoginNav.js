import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Text } from "react-native";
import Test from "../Components/Test";
import Home from "../Components/Home";
import AppNav from "./AppNav";
// import { NavigationContainer } from "@react-navigation/native";
import pin from "../Components/Pin";
const Stack = createNativeStackNavigator();

export default function LoginNav() {
  return (
  
    <Stack.Navigator initialRouteName="home"  options={{ headerShown: false }}>
      <Stack.Screen name="test" component={Test} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="pin" component={pin} />
      <Stack.Screen name="App" component={AppNav} />
    </Stack.Navigator>
  
  );
}
