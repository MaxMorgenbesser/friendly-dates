import { connectionstr, firebaseAuth } from "./credentials.js";
import { MongoClient } from "mongodb";
// import { getDatabase } from "firebase/database";
import { getDatabase } from "firebase-admin/database";
import { getApps } from "firebase-admin/app";
import { initializeApp } from "firebase-admin/app";
// import {getFirestore } from "firebase-admin/firestore"

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
