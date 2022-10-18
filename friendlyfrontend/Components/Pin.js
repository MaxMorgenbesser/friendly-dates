import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useState, useContext } from "react";
import { data } from "../App";
import { useNavigation } from "@react-navigation/native";

export default function Pin() {
  const [checkPin, setCheckPin] = useState("");
  const [error, setError] = useState("");
  const { user, setUser, tempToken } = useContext(data);
  const navigation = useNavigation();

  const verifypin = () => {
    // console.log(tempToken,user.uid, checkPin)
    fetch(`https://friendlydatesbackend.web.app/users/verifypin/${user.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tempToken,
      },
      body: JSON.stringify({ pin: checkPin }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          return;
        }
        if (data.newUser) {
          navigation.navigate("AddUser");
          return;
        }

        await AsyncStorage.setItem("@token", data.token);
        navigation.navigate("App");
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* {user && console.log(user)} */}
      <Text>verify pin page</Text>
      <TextInput
        value={checkPin}
        keyboardType="numeric"
        placeholder="pin"
        style={{
          height: 40,
          color: "black",
          fontWeight: "bold",
          borderWidth: 1,
          padding: 10,
          margin: "8%",
          width: "40%",
          backgroundColor: "white",
        }}
        onChangeText={setCheckPin}
      />
      {error && <Text>{error}</Text>}
      <Button onPress={() => verifypin()} title="verify pin"></Button>
    </SafeAreaView>
  );
}
