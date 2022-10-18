import { Button, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { data } from "../App";

export default function Home() {
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const { setUid, setTempToken } = useContext(data);

  useEffect(() => {
    if (user) {
  navigation.navigate("pin")
    }
  }, [user, setUser]);




  const handlesubmit = () => {
    fetch("https://friendlydatesbackend.web.app/users/verifynum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: Number(number) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        }
        if (data.token) {
          setTempToken(data.token);
          
          setUser(jwtDecode(data.token));
          
        }
      }).catch(err=> console.log(err));
     
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home page</Text>

      {/* {user && console.log(user)} */}
      <Button
        title="go to test"
        onPress={() => navigation.navigate("test")}
      ></Button>
      <Button
        title="go to App"
        onPress={() => navigation.navigate("App")}
      ></Button>

      <TextInput
        value={number}
        onChangeText={setNumber}
        keyboardType="default"
        style={{
          height: 40,
          margin: 12,
          color: "black",
          borderWidth: 1,
          padding: 10,
          flex: 1,
          width: "30%",
          backgroundColor: "white",
        }}
      />
      {error && <Text>{error}</Text>}
      <Button title="submit number" onPress={() => handlesubmit()}></Button>
    </SafeAreaView>
  );
}
