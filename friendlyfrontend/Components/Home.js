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
  // const [user, setUser] = useState("");
  const { setUid, setTempToken, tempToken , user, setUser } = useContext(data);

  useEffect(()=>{
   if (user){
    navigation.navigate("pin")
   }
  },[user,setUser])

  const handlesubmit = async () => {
    fetch("https://friendlydatesbackend.web.app/users/verifynum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: Number(number) }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        }
        if (data.token) {
           setTempToken(data.token)
          setUser(jwtDecode(data.token))
        }
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
      <Text>Home page</Text>

      {/* {user && console.log(user)} */}
      <Button
        title="go to Add user"
        onPress={() => navigation.navigate("AddUser")}
      ></Button>
      <Button
        title="go to pin"
        onPress={() => navigation.navigate("pin")}
      ></Button>
      <Button
        title="go to App"
        onPress={() => navigation.navigate("App")}
      ></Button>

      <TextInput
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
        style={{
          height: 40,
          color:"black",
         fontWeight:"bold",
          borderWidth: 1,
          padding: 10,
          margin:"8%",
          width: "40%",
          backgroundColor: "white",
        }}
      />
      {error && <Text>{error}</Text>}
      <Button title="submit number" onPress={() => handlesubmit()}></Button>
    </SafeAreaView>
  );
}
