import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Credentials } from "aws-sdk";
import * as ImageManipulator from "expo-image-manipulator";
import S3 from "aws-sdk/clients/s3";
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { accesskeyid, secretAccessKey } from "./awscreds";

export default function MyProfile() {
  const [camera, setCamera] = useState(null);
  const { token, SetToken } = useContext(data);
  const [user, setUser] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();
 
  const [showCamera, SetShowCamera] = useState(false);
  const [AwsLink, setAwsLink] = useState(false);

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      SetShowCamera(!showCamera);
    } else {
      Alert.alert("Access denied");
    }
  };

  const getBlob = async (fileUri) => {
    // console.log(fileUri);

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      fileUri,
      [{ resize: { width: 400 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 0.6, format: "jpeg" }
    );

    const resp = await fetch(resizedPhoto.uri);
    return await resp.blob();
  };

  const uploadImage = async (uploadUrl, data) => {
    const imageBody = await getBlob(data);

    // console.log(imageBody);

    const limitedEditionHolidayBlend = await fetch(uploadUrl, {
      method: "PUT",
      body: imageBody,
    }).then((res) => res);

    return limitedEditionHolidayBlend;
  };

  async function uploadToS3() {
    try {
      const access = new Credentials({
        accessKeyId: accesskeyid,
        secretAccessKey: secretAccessKey,
      });

      const s3 = new S3({
        credentials: access,
        region: "us-east-1", //"us-west-2"
        signatureVersion: "v4",
      });

      const fileId = Math.random().toString(36).slice(2);
      const signedUrlExpireSeconds = 60 * 15;
      setAwsLink(`https://friendlydatesbucket.s3.amazonaws.com/${fileId}.jpg`);
      const url = await s3.getSignedUrlPromise("putObject", {
        Bucket: "friendlydatesbucket",
        Key: `${fileId}.jpg`,
        ContentType: "image/jpeg",
        Expires: signedUrlExpireSeconds,
      });

      const image = await uploadImage(url, photo);
      // console.log(image)

      return image.url.split("?")[0];
    } catch (error) {
      console.log(error);
    }
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      // console.log(data.uri);
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
      console.log("this useeffect is running");
      setUser(jwtDecode(token));
    }
  }, [token, SetToken]);

  const submitLinkToMongo = () => {
    fetch(`https://friendlydatesbackend.web.app/users/updatepic/${user.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ photo: AwsLink }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(null)
        console.log(data)})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (AwsLink && user) {
      submitLinkToMongo();
    }
  }, [AwsLink, setAwsLink]);

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
      <View>
        <Text>My profile is going here</Text>
      </View>

      {user && user.user && (
        <View>
          <Text>welcome {user.user.firstName}</Text>
        </View>
      )}
      {user && user.user && user.user.photo && (
        <Image
          source={user.user.photo}
          style={{ height: "20%", width: "40%" }}
        />
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
          <Button title="Submit Photo" onPress={uploadToS3}></Button>
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
