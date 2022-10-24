import { View, Text, SafeAreaView ,Button } from "react-native";
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from 'expo-camera'


export default function MyProfile() {
  const { token } = useContext(data);
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState();
  const [showCamera, SetShowCamera] = useState(false);

  const startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
 if(status === 'granted'){
    SetShowCamera(!showCamera)
 }else{``
   Alert.alert("Access denied")
 }
}

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
      {photo && console.log(photo)}
      {user && console.log(user)}
      {token && console.log(token)}
      <View>
        <Text>My profile is going here</Text>
      </View>

      {user && (
        <View>
          <Text>welcome {user.user.firstName}</Text>
          <Button title="Choose Photo" onPress={pickImage} />
          {/* {startCamera && (
        <Camera
          style={{flex: 1,width:"100%"}}
          ref={(r) => {
            camera = r
          )}} ></Camera> */}
        </View>
      )}
        <Button title = "submit photo" onPress={()=>(startCamera())}></Button>
      {showCamera && <Camera m style={{flex: 1,width:"100%"}}
      ></Camera>}
    </SafeAreaView>
  );
}
