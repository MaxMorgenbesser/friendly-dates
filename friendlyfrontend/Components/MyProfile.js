import { View, Text, SafeAreaView ,Button,TouchableOpacity, Dimensions, Image } from "react-native";
import { data } from "../App";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
import {Camera, CameraType} from 'expo-camera'


export default function MyProfile() {
  const [camera, setCamera] = useState(null);
  const { token } = useContext(data);
  const [user, setUser] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();
  const [showCamera, SetShowCamera] = useState(false);

  const startCamera = async () => {
  const {status} = await Camera.requestCameraPermissionsAsync()
 if(status === 'granted'){
    SetShowCamera(!showCamera)
 }else{
   Alert.alert("Access denied")
 }
}


const takePicture = async () => {
  if (camera) {
    const data = await camera.takePictureAsync();
    console.log(data.uri);
    setPhoto(data.uri);
    SetShowCamera(false)
  }
};


function toggleCameraType() {
  setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
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
      console.log(token);
      setUser(jwtDecode(token))
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
         
          

          
        
        </View>
      )}
     { !photo && !showCamera && <Button title="Choose Photo" onPress={pickImage} />}
      {photo && <><Image source = {{uri:photo}} style={{ height: 200, margin: 10, width: 200}} resizeMode="contain"/>
      <Button title="use a different photo" onPress={()=> setPhoto(null)} ></Button>
      <Button title="Submit Photo"  ></Button>
      </>}

    
      {!photo && !showCamera &&  <Button title = "Take photo instead" onPress={()=>{
          setPhoto(null)
          startCamera()}}></Button>
      }
      {showCamera && <Camera type={type} 
      ref={(ref) => setCamera(ref)}
      style={{flex: 1,width:"100%"}}
      ><View>
        
        <TouchableOpacity style={{
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 50,
      }}
      onPress={takePicture}/>
        <TouchableOpacity
        onPress={toggleCameraType}
        style={
         {
          backgroundColor: "white",
          width: 50,
          height: 50,
          borderRadius: 50,
        }
        
      }/>
      
      <Button title = "cancel" onPress={()=>SetShowCamera(false)}></Button>
      </View>
        </Camera>}
    </SafeAreaView>
  );
}
