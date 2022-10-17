import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
export default function Test(){
    const navigation = useNavigation()
    return (
        <SafeAreaView>
        <Text>You will add userinfo here
            <Button title="go home" onPress={()=>navigation.navigate("home")}></Button>
        </Text>
        </SafeAreaView>
        
    )
}