import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native";
import jwtDecode from "jwt-decode";

export default function Pin() {

const verifypin = ()=>{
fetch('',{

})
}
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>verify pin page</Text>
      <TextInput
        keyboardType="numeric"
        style={{
          height: "15%",
          color: "white",
          backgroundColor: "blue",
          width: "40%",
          margin: "10%",
        }}
      />
      <Button onPress={()=>verifypin()} title="verify pin"></Button>
    </SafeAreaView>
  );
}
