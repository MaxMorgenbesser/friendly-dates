import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwtDecode from "jwt-decode";
import { useState, useContext, useEffect } from "react";
import { data } from "../App";
import { useNavigation } from "@react-navigation/native";

export default function Pin() {
  const [checkPin, setCheckPin] = useState("");
  
  const [error, setError] = useState("");
  const { user, setUser, tempToken,token,SetToken } = useContext(data);
  const navigation = useNavigation();
  useEffect(()=>{
    if (token){
     
      AsyncStorage.setItem("@token" , JSON.stringify(token))
    }
  },[token,SetToken])
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
      .then(async (thisdata) => {
          // await AsyncStorage.clear()
         console.log(thisdata.token);
        if (thisdata.error) {
          setError(thisdata.error);
          return;
        }
        if (thisdata.newUser) {
          navigation.navigate("AddUser");
          return;
        }
if  (thisdata.token) {
        SetToken(thisdata.token)
        navigation.navigate("App")
        return
}
else{
  setError("unknown error")
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
