import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";

import { data } from "../App";

export default function Test() {
  const { uid,tempToken } = useContext(data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleuserinfo = () => {
    if (!uid)  {
      setError("missing user id");
      return;
    }
    fetch(`https://friendlydatesbackend.web.app/users/adduserinfo/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":tempToken
      },
      body: JSON.stringify({
        user: { firstName: firstName, lastName: lastName, email: email },
      }),
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  };

  return (
    <SafeAreaView>
        {uid && console.log(uid)}
      {firstName && console.log(firstName)}
      <Text>You will add user info here</Text>
      <Button
        title="go home"
        onPress={() => navigation.navigate("home")}
      ></Button>
      <TextInput
        placeholder="first name"
        keyboardType="default"
        value={firstName}
        onChangeText={setFirstName}
        style={{
          height: 40,
          margin: 12,
          color: "white",
          borderWidth: 1,
          padding: 10,
          width: "80%",
          backgroundColor: "blue",
        }}
      />
      {tempToken && console.log(tempToken)}
      <TextInput
        placeholder="first name"
        keyboardType="default"
        value={lastName}
        onChangeText={setLastName}
        style={{
          height: 40,
          margin: 12,
          color: "white",
          borderWidth: 1,
          padding: 10,
          width: "80%",
          backgroundColor: "blue",
        }}
      />
      <TextInput
        keyboardType="email"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          margin: 12,
          color: "white",
          borderWidth: 1,
          padding: 10,
          width: "80%",
          backgroundColor: "blue",
        }}
      />
      <Button title="submit user info" onPress={()=>handleuserinfo()}/>
      {error && <Text>{error}</Text>}
      {/* <Button title="go home" onPress={()=>navigation.navigate("home")}></Button> */}
    </SafeAreaView>
  );
}
