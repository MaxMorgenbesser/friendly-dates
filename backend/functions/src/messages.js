import { FbDBConnect } from "../dbconnect.js";
import { ref, set } from "firebase/database";

const db = FbDBConnect()
export async  function addMessage(req,res){
   
    // console.log(db)
   await set(ref(db,'messages'),{
        message:req.body
    })
    res.send({
        "inserted":true
    })
}