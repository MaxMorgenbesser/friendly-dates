import { View, Text, SafeAreaView, Button, Image } from "react-native";
// import AsyncStorage,{ useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { data } from "../App";
import jwtDecode from "jwt-decode";
import TinderCard from "react-tinder-card";

export default function Connect() {
  const navigation = useNavigation();
  const { token } = useContext(data);
  const [pms, setPms] = useState();
  const [user, setUser] = useState(jwtDecode(token));
  const [status, setStatus] = useState(null);
  const [uid, setUID] = useState(null);

  useEffect(() => {
    if (status) {
      sendstatus()
    }
  }, [status,uid]);




  const sendstatus = () => {
   
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
          22;
          setUID(null);

          fetch(`https://friendlydatesbackend.web.app/connect/${user.uid}`, {
            headers: {
              Authorization: token,
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
      headers: { Authorization: token, "Content-Type": "application/json" },
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
      {uid && console.log(uid)}
      <Button
        onPress={() => navigation.navigate("home")}
        title="go Home"
      ></Button>
      <Text>Connect page</Text>
      {pms &&
        pms.map((pm) => {
          const onSwipe = (direction) => {
            if (direction === "right") {
              setStatus("like");
              setUID(pm.uid)
            } else if (direction == "left") {
              setStatus("dislike");
              setUID(pm.uid)
            }
            console.log("You swiped: " + direction);
            
          };
          return (
            <View
            key={pm.uid}
              style={{
                borderColor: "black",
                borderWidth: "3%",
        
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                width:"100%",
                height:"50%"
                
              }}
            >
              <TinderCard onSwipe={onSwipe}  >
                {pm.user.photo && (
                  <>
                  {console.log(pm.user.photo)}
                  <Image
                    style={{ height: "40%", width: "40%" }}
                    source={{ uri: pm.user.photo }}
                  ></Image>
                  </>
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
              </TinderCard>
            </View>
          );
        })}
    </SafeAreaView>
  );
}
