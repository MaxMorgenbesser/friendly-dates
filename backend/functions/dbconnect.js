import { connectionstr, firebaseAuth } from "./credentials.js";
import { MongoClient } from "mongodb";
import path from "path";
import bucketcreds from "./bucketcreds.json" assert { type: "json" };
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { getDatabase } from "firebase/database";
import { getDatabase } from "firebase-admin/database";
import { initializeApp } from "firebase-admin/app";
import { Storage } from "@google-cloud/storage";
import { type } from "os";
// import {getFirestore } from "firebase-admin/firestore"
// import { getStorage } from "firebase/storage";

export function DbConnect() {
  const client = new MongoClient(connectionstr);
  const db = client.db("friendlydates");
  const collection = db.collection("users");
  return collection;
}

export function FbDBConnect() {
  const app = initializeApp(firebaseAuth);
  const db = getDatabase(app);
  return db;
}

export async function storageConnect(req, res) {
  const gc = new Storage({
    keyFile: bucketcreds,
    projectId: "friendlydatesbackend",
  });
 return gc
  // const url = `https://firebasestorage.googleapis.com/v0/b/friendlydatesbackend.appspot.com/o/${filename}?alt=media`
}
