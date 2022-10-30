import jwtDecode from "jwt-decode";
import { useEffect, useContext, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../App";

export default function Matches() {
  const { token } = useContext(data);
  const [user, setUser] = useState(jwtDecode(token));
  // const [user,setUser] = useState(jwtDecode(token))
  const [matches, setMatches] = useState(jwtDecode(token));
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetch(`https://friendlydatesbackend.web.app/connect/matches/${user.uid}`)
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      {matches && console.log(matches)}
      <Text>My matches will appear here</Text>
      {matches["matches found"] &&
        matches["matches found"].map((match) => {
          return (
            <View key={match.uid}>
              <Text>{match.user.firstName}</Text>
            </View>
          );
        })}
    </SafeAreaView>
  );
}
