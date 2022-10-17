import { accountSID, authToken, twilionumber } from "../credentials.js";
import { DbConnect } from "../dbconnect.js";
import twilio from "twilio"

export async function verifynum (req,res){
    const number = req.body.number
    if (!number){
    res.status(200).send({"error":"number is required"})
    return
    }
    if (number.length< 8){
        res.status(200).send({"error":"number must be at least 10 digits"})
        return
    }
let pin = ''
let rnum = ''
    const collection = DbConnect()
    for (let i = 1; i<5; i++){
        rnum = Math.floor(Math.random(0) * 10)
        pin += rnum
        // console.log(rstring)
      }

const client = new twilio(accountSID,authToken);
const user = await collection.findOne({num:number})
if (user){
    console.log("user already is in the db")
    client.messages.create({
        to:number,
        from:twilionumber,
        body:"Welcome back to friendly dating, here is your pin: " + pin 
    })
    res.send({"welcome back":true})
} else {
    // console.log(number)
    client.messages.create({
        to:number,
        from:twilionumber,
        body:"Welcome to friendly dating, here is your pin: " + pin 
    })
   const newuser =  await collection.insertOne({num:number, pin:pin})
   const updateduser = await collection.findOneAndUpdate({pin:pin}, {
    $set:{uid:newuser.insertedId.toString()

    }
   })
   let updatevalue = updateduser.value
    res.send({updatevalue})
}
}