import jwtDecode from "jwt-decode";
import { useEffect, useContext, useState } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../App";

export default function Matches() {
  const { token } = useContext(data);
  const [user, setUser] = useState(jwtDecode(token));
  // const [user,setUser] = useState(jwtDecode(token))
  const [matches, setMatches] = useState();
  const [loading, setLoading] = useState(true);
  const [noMatches, setNoMatches] = useState(true);

  useEffect(() => {
    fetch(`https://friendlydatesbackend.web.app/connect/matches/${user.uid}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data["matches found"]) {
          console.log("ydccwb")
          setNoMatches(true);
          setLoading(false);
        } else {
          setMatches(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      {matches && console.log(matches)}
      <Text>My matches will appear here</Text>
      {matches &&
        matches["matches found"] &&
        matches["matches found"].map((match) => {
          return (
            <View style={{ height: "100%" }}>
              <Text key={match.uid}>{match.user.firstName}</Text>
              {match.user && match.user.photo && (
                <Image
                  source={{ uri: match.user.photo }}
                  style={{ height: "40%", width: "40%" }}
                ></Image>
              )}

              {noMatches && !loading && <Text>this guy is lonely</Text>}
            </View>
          );
        })}
    </SafeAreaView>
  );
}
