import { accountSID, authToken, secretKey, twilionumber } from "../credentials.js";
import { DbConnect } from "../dbconnect.js";
import twilio from "twilio"
import jwt from 'jsonwebtoken'
import e from "express";

export async function verifyPin (req,res){
const pin = req.body.pin
const uid = req.params.uid
if (!uid || !pin){
    res.status(400).send({"error":"missing fields"})
    return
}
const collection = DbConnect()
const user = await collection.findOne({uid:uid})
// console.log(user)
if (!user){
    res.status(400).send({"error":"This user has not been created yet"})
    return
}
if (pin != user.pin){
    res.status(400).send({"error":"incorrect pin"})
    return
} else if (pin == user.pin){
if (user.user){
    res.status(200).send({"success":true, "token": jwt.sign(user,secretKey)})
    return
}else{
res.status(200).send({"success":true, "newUser":true})

}


}

}







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
    // console.log(user)
    client.messages.create({
        to:number,
        from:twilionumber,
        body:"Welcome back to friendly dating, here is your pin: " + pin 
    })
    const updateduser = await collection.findOneAndUpdate({num:number},
        {$set:{pin:pin}})
    let val = updateduser.value
    val.pin=pin
    const token = jwt.sign(val,secretKey)
    res.send({token:token})
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
   updatevalue.uid = newuser.insertedId.toString()
const token = jwt.sign(updatevalue,secretKey)
    res.send({token:token})
    }
}


export const adduserinfo = async (req,res)=>{
const user = req.body.user
if (!user.firstName|| !user.lastName || !user.email){
    res.send({"error":"missing fields"})
    return
}
const uid = req.params.uid
if (!uid){
    res.status(401).send({"error": "invalid access"})
    return
}
const collection = DbConnect()
const finduser = collection.findOne({uid:uid})

if (!finduser || !finduser.uid == uid){
 res.status(401).send({"error": "invalid access"})
    return
}
const senduser = await collection.findOneAndUpdate({uid:uid}, 
    {$set:{user:user}})
if (!senduser){
    res.send({"error":"user not found"})
}
const val = senduser.value
val.user = user
const token = jwt.sign(val,secretKey)
res.status(200).send({token:token})

}