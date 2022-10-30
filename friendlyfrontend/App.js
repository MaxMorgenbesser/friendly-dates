import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LoginNav from "./Navigation/LoginNav";
import { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import AppNav from "./Navigation/AppNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const data = createContext();
export default function App() {
  const [uid, setUid] = useState();
  const [pin, setPin] = useState();
  const [user, setUser] = useState();
  const [tempToken, setTempToken] = useState();
  const [token, SetToken] = useState();

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    SetToken(await AsyncStorage.getItem("token"));
    // console.log(token);
  }

  return (
    <data.Provider
      value={{
        setUid,
        uid,
        setTempToken,
        tempToken,
        pin,
        setPin,
        user,
        setUser,
        token,
        SetToken,
      }}
    >
      <NavigationContainer initialRouteName="test">
        <LoginNav />
      </NavigationContainer>
    </data.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
