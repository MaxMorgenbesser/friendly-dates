import { View, Text,SafeAreaView, Button } from "react-native";
// import AsyncStorage,{ useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function Connect() {
const navigation = useNavigation()

  return (
    <SafeAreaView>
      <Button onPress={() => navigation.navigate("home")} title = "go Home"></Button>
      <Text>Connect page</Text>
    </SafeAreaView>
  );
}
