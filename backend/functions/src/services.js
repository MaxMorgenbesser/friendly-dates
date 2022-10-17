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

    const collection = DbConnect()
    const client = new twilio(accountSID,authToken);

    client.messages.create({
        to:number,
        from:twilionumber,
        body:"test" 
    })
    
    console.log(number)
    await collection.insertOne({num:number})
    res.send({number:number})

}