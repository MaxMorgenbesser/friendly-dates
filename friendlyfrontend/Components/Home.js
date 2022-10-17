import { Button, Text, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"

export default function Home() {
  const navigation = useNavigation();
  const [number,setNumber] = useState('')
  const [error,setError] = useState("")
  const [user,setUser] = useState("")


useEffect(()=>{
    if (user.user){
        navigation.navigate("test")
    }
},[user,setUser])

    const handlesubmit = () => {
        fetch("https://friendlydatesbackend.web.app/users/verifynum",{
            method:"POST",
            headers: {
                 "Content-Type": 
                 "application/json"
                },
            body:JSON.stringify({number:Number(number)})
        })
        .then(res=>res.json())
        .then(data=>
            {
                console.log(data)
            if(data.error){
                setError(data.error)
            } if(data.token){
                setUser(jwtDecode(data.token))
            }
            
            
        })


    }
  return (
    <SafeAreaView style = {{}}>
      <Text>Home page</Text>
      {user && console.log(user)}
      <Button
        title="go to test"
        onPress={() => navigation.navigate("test")}
      ></Button>

      <TextInput value={number} onChangeText={setNumber}
      keyboardType="numeric"
      style={{ height: 40,
        margin: 12,
        color:"white",
        borderWidth: 1,
        padding: 10,
        width:"30%",
    backgroundColor:"blue"}}
      />
{error && <Text>{error}</Text>}
<Button title="submit number" onPress={()=>handlesubmit()}></Button>
    </SafeAreaView>
  );
}
