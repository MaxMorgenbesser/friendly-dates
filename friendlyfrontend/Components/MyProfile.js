import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
// import {storageConnect} from '../../backend/functions/dbconnect.js'
import * as ImageManipulator from "expo-image-manipulator";
// import RNFS from 'react-native-fs'
// import storage from '@react-native-firebase/storage'
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
// import { getStorage } from "./Firebase";

export default function MyProfile() {
  const [camera, setCamera] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const { token } = useContext(data);
  const [user, setUser] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();
  // const [blob, setBlob] = useState();
  const [showCamera, SetShowCamera] = useState(false);

  // useEffect(() => {
  //   if (photo) {
  //     // console.log(photo)
  //     setBlob(getBlob(photo));
  //     //  console.log(getBlob(photo));
  //   }
  // }, [photo, setPhoto]);

  const getBlob = async (fileUri) => {
    // console.log(fileUri);

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      fileUri,
      [{ resize: { width: 400 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 0.6, format: "jpeg" }
    );
    // console.log(resizedPhoto);
    const resp = await fetch(resizedPhoto.uri);
    console.log(resp)
    const blob = await resp.blob()
    return blob;
  };


  const submitPhoto = async () => {
// const gc = wait storageConnect()
     const blob = await getBlob(photo)
      console.log(blob)
      

    fetch(`https://friendlydatesbackend.web.app/users/updateuser/${user.uid}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "photo": blob}), 
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(null);
        // setBlob(null);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      SetShowCamera(!showCamera);
    } else {
      Alert.alert("Access denied");
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      // console.log(" --- DATA ---->> ", data);
      setPhoto(data.uri);
      SetShowCamera(false);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  useEffect(() => {
    if (token) {
      // console.log(token);
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
      {/* {photo && console.log(photo)} */}
      {/* {blob && console.log(blob)} */}
      <View>
        <Text>My profile is going here</Text>
      </View>

      {user && (
        <View>
          <Text>welcome {user.user.firstName}</Text>
        </View>
      )}
      {!photo && !showCamera && (
        <Button title="Choose Photo" onPress={pickImage} />
      )}
      {photo && (
        <>
          <Image
            source={{ uri: photo }}
            style={{ height: 200, margin: 10, width: 200 }}
            resizeMode="contain"
          />
          <Button
            title="use a different photo"
            onPress={() => setPhoto(null)}
          ></Button>
          <Button title="Submit Photo" onPress={submitPhoto}></Button>
        </>
      )}

      {!photo && !showCamera && (
        <Button
          title="Take photo instead"
          onPress={() => {
            setPhoto(null);
            startCamera();
          }}
        ></Button>
      )}
      {showCamera && (
        <Camera
          type={type}
          ref={(ref) => setCamera(ref)}
          style={{ flex: 1, width: "100%" }}
        >
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
              onPress={takePicture}
            />
            <TouchableOpacity
              onPress={toggleCameraType}
              style={{
                backgroundColor: "white",
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />

            <Button
              title="cancel"
              onPress={() => SetShowCamera(false)}
            ></Button>
          </View>
        </Camera>
      )}
    </SafeAreaView>
  );
}
