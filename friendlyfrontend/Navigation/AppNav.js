import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import  Connect  from "../Components/Connect";
import Matches from "../Components/Matches";
import MyProfile from "../Components/MyProfile";

const Tab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <>
      
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
        
    >
          <Tab.Screen name="Connect" component={Connect} /> 
          <Tab.Screen name="Matches" component={Matches} />
          <Tab.Screen name="my profile" component={MyProfile} />
        </Tab.Navigator>
     
    </>
  );
}
