import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import  Connect  from "../Components/Connect";

const Tab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <>
      
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        
        
      })}
    >
          <Tab.Screen name="Connect" component={Connect} />
        </Tab.Navigator>
     
    </>
  );
}
