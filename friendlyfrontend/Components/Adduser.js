import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { data } from "../App";

export default function Test() {
  const { user,setUser ,tempToken, SetToken} = useContext(data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleuserinfo = () => {
    if (!user.uid)  {
      setError("missing user id");
      return;
    }
    fetch(`https://friendlydatesbackend.web.app/users/adduserinfo/${user.uid}`, {
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
    .then( async (data) =>
      { 
        console.log(data)
        if (data.error){
          setError(data.error)
          return
        }
        else{
         SetToken(data.token)
         await AsyncStorage.setItem("token", (data.token))
         navigation.navigate("App")
        }
      
      })
  };

  return (
    <SafeAreaView style={{display:"flex",
    alignItems:"center", justifyContent:"center"}}>
      <Text>You will add user info here</Text>
      <Button onPress={()=> AsyncStorage.clear()} title = "clear AsyncStorage"></Button>
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
          color:"black",
         fontWeight:"bold",
          borderWidth: 1,
          padding: 10,
          margin:"8%",
          width: "60%",
          backgroundColor: "white",
        }}
      />
      {/* {tempToken && console.log(tempToken)} */}
      <TextInput
        placeholder="Last Name"
        keyboardType="default"
        value={lastName}
        onChangeText={setLastName}
        style={{
          height: 40,
          color:"black",
         fontWeight:"bold",
          borderWidth: 1,
          padding: 10,
          margin:"8%",
          width: "60%",
          backgroundColor: "white",
        }}
      />
      <TextInput
      placeholder="email"
        keyboardType="email"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          color:"black",
         fontWeight:"bold",
          borderWidth: 1,
          padding: 10,
          margin:"8%",
          width: "60%",
          backgroundColor: "white",
        }}
      />
      <Button title="submit user info" onPress={()=>handleuserinfo()}/>
      {error && <Text>{error}</Text>}
      {/* <Button title="go home" onPress={()=>navigation.navigate("home")}></Button> */}
    </SafeAreaView>
  );
}
