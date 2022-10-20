import mongoose from 'mongoose'
import {connectionstr} from '../credentials.js'
import {messageSchema} from './Schemas.js'
export async function connect(req,res) {
    
   let conn = await mongoose.connect(connectionstr)
   
    
//    console.log(conn)
  return conn
}

export const chat = async (req,res) => {
const newMessage = req.body.message
const newUid = req.body.uid
const conn = connect()
const Messages = mongoose.model("message", messageSchema)
const message = new Messages({
    message:newMessage,
    uid:newUid
})
await message.save()
let Allmessages = await Messages.find({})
res.send({Allmessages})

}