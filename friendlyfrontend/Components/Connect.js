import { View, Text, SafeAreaView, Button, Image } from "react-native";
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
    console.log("owdnv");
    if (status) {
      sendstatus();
      console.log("wodubc");
    }
  }, [uid, setStatus]);

  const [status, setStatus] = useState(null);
  const [uid, setUID] = useState(null);

  const sendstatus = () => {
    console.log("function is running");
    if (status && uid) {
      fetch(
        `https://friendlydatesbackend.web.app/connect/likeordislike/${user.uid}`,
        {
          method: "PUT",
          headers: { Authorization: token, "Content-Type": "application/json" },
          body: JSON.stringify({ status: status, uid: uid }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStatus(null);
          setUID(null);

          fetch(`https://friendlydatesbackend.web.app/connect/${user.uid}`, {
            headers: {
              "Authorization": token,
              "Content-Type": "application/json",
            },
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data)
              setPms(data.users);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      console.log("need uid or status");
    }
  };

  useEffect(() => {
    console.log(user.uid);
    fetch(`https://friendlydatesbackend.web.app/connect/${user.uid}`, {
      headers: { Authorization: token ,
        "Content-Type": "application/json",},
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
                overflow: "scroll",
              }}
            >
              {pm.user.photo && (
                <Image
                  source={{ uri: pm.user.photo }}
                  height="30%"
                  width="30%"
                ></Image>
              )}
              <Button
                title="like"
                onPress={() => {
                  setStatus("like");
                  setUID(pm.uid);
                }}
              ></Button>
              <Text key={pm.uid}>{pm.user.firstName}</Text>
              <Button
                title="dislike"
                onPress={() => {
                  setStatus("dislike");
                  setUID(pm.uid);
                }}
              ></Button>
            </View>
          );
        })}
    </SafeAreaView>
  );
}
