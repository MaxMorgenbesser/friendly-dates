import { View, Text, SafeAreaView ,Button } from "react-native";
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';


export default function MyProfile() {
  const { token } = useContext(data);
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };





  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);
  return (
    <SafeAreaView
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      {user && console.log(user)}
      {token && console.log(token)}
      <View>
        <Text>My profile is going here</Text>
      </View>

      {user && (
        <View>
          <Text>welcome {user.user.firstName}</Text>
          <Button title="Choose Photo" onPress={pickImage} />
        </View>
      )}
    </SafeAreaView>
  );
}
