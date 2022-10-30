import { View, Text, SafeAreaView, Button } from "react-native";
// import AsyncStorage,{ useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { data } from "../App";
import jwtDecode from "jwt-decode";

export default function Connect() {
  const navigation = useNavigation();
  const { token } = useContext(data);
  const [pms, setPms] = useState();
  const [user, setUser] = useState(jwtDecode(token));


  
  
  
  
  
  
  useEffect(() => {
    fetch(`https://friendlydatesbackend.web.app/connect/${user.uid}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setPms(data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button
        onPress={() => navigation.navigate("home")}
        title="go Home"
      ></Button>
      <Text>Connect page</Text>
      {pms &&
        pms.map((pm) => {
          return (
            <View
              style={{
                borderColor: "black",
                borderWidth: "3%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                height: "85%",
                width: "80%",
                overflow:"scroll"
              }}
            >
              <Button title="like"></Button>
              <Text>{pm.user.firstName}</Text>
              <Button title="dislike"></Button>
            </View>
          );
        })}
    </SafeAreaView>
  );
}
