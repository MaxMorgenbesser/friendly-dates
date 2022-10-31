import {
  accountSID,
  authToken,
  secretKey,
  twilionumber,
} from "../credentials.js";
import { DbConnect, storageConnect } from "../dbconnect.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import { user } from "firebase-functions/v1/auth";
// import e from "express";


export async function connect(req,res) {
const uid = req.params.uid

if (!uid){
  res.status(400).send({error:"missing uid"})
  return
}
const collection = DbConnect()
const allusers = await collection.find().toArray()
const thisUser = await collection.findOne({uid})

let users = allusers.filter(user => 
  (user.uid != uid))

if (thisUser.user && thisUser.user.Ilike) {
users = users.filter(user=>(!thisUser.user.Ilike.includes(user.uid)))
}
if (thisUser.user && thisUser.user.Idislike) {
users = users.filter(user=>(!thisUser.user.Idislike.includes(user.uid)))
}

users = users.filter(user=>(user.user))

res.status(200).send({"users":users})
}





export async function getmatches(req, res) {
  let matcharr = [];
  const uid = req.params.uid;
  if (!uid) {
    res.status(400).send({ error: "user not found" });
    return;
  }

  const collection = DbConnect();
  const user = await collection.findOne({ uid: uid });
  // console.log(user)
  if (!user) {
    res.status(400).send({ error: "user not found" });
    return;
  }

  const allusers = await collection.find().toArray();
  // console.log(allusers)
  // console.log(user);
  if (user.user && user.user.likesme && user.user.Ilike) {
    console.log(user.user.likesme)
    console.log(user.user.Ilike)
    allusers.map((oneuser) => {
      if (oneuser.user && oneuser.user.Ilike) {
        console.log(oneuser.user.Ilike);
        if (
          oneuser.user.Ilike.includes(uid) &&
          user.user.Ilike.includes(oneuser.uid)
        ) {
          matcharr.push(oneuser);
        }
      }

      // console.log(true)

      //  && user.user?.Ilike?.includes(oneuser.uid)
    });
    res.status(200).send({ "matches found": matcharr });
    return;
  }
  res.status(200).send({ "matches found": false });
}

export async function likeOrDislike(req, res) {
  let uid = req.params.uid;
  const status = req.body.status;
  console.log(status);
  // console.log(uid);
  if (!uid) {
    res.status(400).send({ error: "sender not found" });
    return;
  }

  if (!status || status != "like" && status !="dislike" ) {
    res.status(400).send({ error: "status is incorrect" });
    return;
  }

  const collection = DbConnect();
  const sender = await collection.findOne({ uid: uid });
  // console.log(sender);
  if (!sender) {
    res.status(400).send({ error: "sender not found" });
    return;
  }

  let receiversUID = req.body.uid;

  const receiver = await collection.findOne({ uid: receiversUID });

  if (!receiver) {
    res.send(res.status(400).send({ error: "receiver not found" }));
  }
  if (status == "like") {
    const updatedSender = await collection.findOneAndUpdate(
      { uid: uid },
      {
        $push: { "user.Ilike": receiversUID },
      }
    );
    const updatedReceiver = await collection.findOneAndUpdate(
      { uid: receiversUID },
      { $push: { "user.likesme": uid } }
    );

    res.status(200).send({ "user liked": true });
    return;
  }

 if (status == "dislike") {
    await collection.findOneAndUpdate(
      { uid: uid },
      {
        $push: { "user.Idislike": receiversUID },
      }
    );
    await collection.findOneAndUpdate(
      { uid: receiversUID },
      { $push: { "user.dislikeslikesme": uid } }
    );
    res.status(200).send({ "user disliked": true });
    return;
  }

  res.status(400).send({ error: "invalid status" });
  return;
}

export async function verifyPin(req, res) {
  const pin = req.body.pin;
  const uid = req.params.uid;
  if (!uid || !pin) {
    res.status(400).send({ error: "missing fields" });
    return;
  }
  const collection = DbConnect();
  const user = await collection.findOne({ uid: uid });
  // console.log(user)
  if (!user) {
    res.status(400).send({ error: "This user has not been created yet" });
    return;
  }
  if (pin != user.pin) {
    res.status(400).send({ error: "incorrect pin" });
    return;
  } else if (pin == user.pin) {
    if (user.user) {
      res.status(200).send({ success: true, token: jwt.sign(user, secretKey) });
      return;
    } else {
      res.status(200).send({ success: true, newUser: true });
    }
  }
}

export async function verifynum(req, res) {
  const number = req.body.number;
  if (!number) {
    res.status(200).send({ error: "number is required" });
    return;
  }
  if (number.length < 8) {
    res.status(200).send({ error: "number must be at least 10 digits" });
    return;
  }
  let pin = "";
  let rnum = "";
  const collection = DbConnect();
  for (let i = 1; i < 5; i++) {
    rnum = Math.floor(Math.random(0) * 10);
    pin += rnum;
    // console.log(rstring)
  }

  const client = new twilio(accountSID, authToken);
  const user = await collection.findOne({ num: number });
  if (user) {
    // console.log(user)
    client.messages.create({
      to: number,
      from: twilionumber,
      body: "Welcome back to friendly dating, here is your pin: " + pin,
    });
    const updateduser = await collection.findOneAndUpdate(
      { num: number },
      { $set: { pin: pin } }
    );
    let val = updateduser.value;
    val.pin = pin;
    const token = jwt.sign(val, secretKey);
    res.send({ token: token });
  } else {
    // console.log(number)
    client.messages.create({
      to: number,
      from: twilionumber,
      body: "Welcome to friendly dating, here is your pin: " + pin,
    });
    const newuser = await collection.insertOne({ num: number, pin: pin });
    const updateduser = await collection.findOneAndUpdate(
      { pin: pin },
      {
        $set: { uid: newuser.insertedId.toString() },
      }
    );
    let updatevalue = updateduser.value;
    updatevalue.uid = newuser.insertedId.toString();
    const token = jwt.sign(updatevalue, secretKey);
    res.send({ token: token });
  }
}

export const adduserinfo = async (req, res) => {
  const user = req.body.user;
  if (!user.firstName || !user.lastName || !user.email) {
    res.send({ error: "missing fields" });
    return;
  }
  const uid = req.params.uid;
  if (!uid) {
    res.status(401).send({ error: "invalid access" });
    return;
  }
  const collection = DbConnect();
  const finduser = collection.findOne({ uid: uid });

  if (!finduser || !finduser.uid == uid) {
    res.status(401).send({ error: "invalid access" });
    return;
  }
  const senduser = await collection.findOneAndUpdate(
    { uid: uid },
    { $set: { user: user } }
  );
  if (!senduser) {
    res.send({ error: "user not found" });
  }
  const val = senduser.value;
  val.user = user;
  const token = jwt.sign(val, secretKey);
  res.status(200).send({ token: token });
};

export const userProfile = async (req, res) => {
  const uid = req.params.uid;
  const photo = req.body.photo;
  const bio = req.body.bio;

  if (!uid) {
    res.status(400).send({ error: "invalid user" });
    return;
  }

  if (!bio && !photo) {
    res.status(400).send({ error: "fields are required" });
    return;
  }
  const collection = DbConnect();

  const user = await collection.findOne({ uid: uid });

  if (!user) {
    res.status(400).send({ error: "invalid user" });
    return;
  }

  if (photo) {
    // console.log("there is a photo");
    console.log(photo)
    const gc = await storageConnect();
    const friendlydatesbucket = gc.bucket("friendlydates");
    await friendlydatesbucket.upload(photo)
    .catch(err => console.log(err))
    const [files] = await friendlydatesbucket.getFiles();
    console.log("Files:");
    files.forEach((file) => {
      console.log(file.metadata);
    });
    
  }

  if (photo && !bio) {
    await collection.findOneAndUpdate(
      { uid: uid },
      { $push: { "user.photos": photo } }
    );
    res.status(200).send({ "photo updated": true });
    return;
  }

  if (bio && !photo) {
    await collection.findOneAndUpdate(
      { uid: uid },
      { $set: { "user.bio": bio } }
    );
    res.status(200).send({ bio: true });
    return;
  }

  await collection.findOneAndUpdate(
    { uid: uid },
    { $push: { "user.photos": photo } }
  );
  await collection.findOneAndUpdate(
    { uid: uid },
    { $set: { "user.bio": bio } }
  );
  res.send({ "bio and photo updated": true });
  return;
};
