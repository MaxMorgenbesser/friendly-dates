import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text } from 'react-native';
import Test from "../Components/Test"
import Home from '../Components/Home';
const Stack = createNativeStackNavigator()

export default function LoginNav (){

    return(

     <Stack.Navigator
     initialRouteName='home'
     defaultScreenOptions={Home}
     >
        <Stack.Screen
        options={{headerShown:false}}
        name='test'
        component={Test}
        />
        <Stack.Screen name = "home" 
        component={Home}
        />
     </Stack.Navigator>
     
    )
}