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
        height:"100%",

        

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
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                width:"80%",
                position:"absolute",
                zIndex:"100%",
                height:"100%",
              }}
            >
              <TinderCard onSwipe={onSwipe}  
              style={{display:"flex",
            alignItems:"center",
          justifyContent:"center"}}
              >
                {pm.user.pics ? (
                  <>
                 {console.log(pm.user.pics)}
                  <Image
                    style={{ height: "100%", width: 320,}}
                    source={{ uri: pm.user.pics[0] }}
                  ></Image>
                 
                  </>
                  
                ): 
                <Image style={{ width:320}}
                 source={{uri:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHYAdgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADsQAAICAQICBAoGCwAAAAAAAAABAgMEBRESIQYxQVETIjJCUmFxkbHBFCOBodHhFRY1VGJyc4KS8PH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAHHqefVgUcdnOT5Rh3gdF11dEHO6cYQXbJkJl9JYR3jiVcb9KfJe4gs3NuzbeO6W/oxXUjmAk7ddz7HytjBd0Io1fpfUP3qf3HCZAlaOkGdX5bhYv4o7fAl8LpBjXtRuXgJP0nvH3lSAH0SLUlunumZKZpWrW4MlCW86O2L7PWi3491eRVG2qXFCS3TA2AAAAAAAA133QoqnbY9oxW7ZR8/LszcmV1j6+UY+iu4nelWU41VY0X5fjS27l1f76isgZMA2UbeHr4vJ41v7wLHpWlVUVRtvgp2yW/jLdRJJwhJcMoRce5rc9ACu63pkKI/ScdbQ32lFdnrRDFw1bhWm5HF6HL2lPAEt0f1B4uSqbJfU2vbn5su8iTIH0NczJw6LlfStOqsk95rxZe1HcAAAAMACm9IrHZqti35QSivdv8yMO7Wv2rk/z/ACOEAZNmNTPJvhTX5Unt7Cy4ujYlGznF2z759XuA59K1iuVUacuXBOK2U31S/Mk5ZeNGPFLIqS7+NHjJwMXJSVtMd0tk1yaILA0pz1G2m+P1dXlbPbfuAzrOqRy9qaN/BJ7uT85kSXSOHjRq8EqIeD9HYjc7Q6nXKzE3hNLfgb3TAroAAsfRKx8GRV2JqS+HyLEVnokvr8h9nAviWYAAAAAAqHSal16lx9lkU/kyJLb0lxHfhq6C3nTz/t7SpASnR2vi1Di9CDfyLOVno/k1UZMo2vh8IlGMn1JlmAETp9vFrOfHfr2+7kSxXtIlJ63kNp+Nx7+rmBYQDzZONcJTskoxit232AUvKh4LJth6M2vvNR0Z90L8y22tNRlLdbmmEJWTjCC3lJ7Jd7AsvRSnhxrrn580l9n/AEnjm0/GWJh1ULzVzfe+06QAAAAADEkpJprdMputabLByHKC3om94vu9RczXkU15FUqrYKUJdaYHz8lNP1q3HSrvTtqXJPfxomdU0S7FbsoTtp9S8aPtREgW+jVcK5La+MX3T5M9RnhVWWXRtpU57cUuNc9inAC1ZGtYdK8Sbtl3Q6veQWfqV+a9pvhrT5QT5fmcZmEZTkowi5SfUordsDyWPo5pjT+mXx/pp/ExpOgtNXZy6uqr8fwLEkktktgMgAAAAAAAAABscOXpOFl7uyrab8+HJncAK9b0ZjvvTktLunHc1fqzb25MP8WWYAQNHRqhc775z9UVwkti4ONiLbHqjD19bf2nQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="}}></Image>}
                <Text style={{}}>{pm.user.firstName}</Text>
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
