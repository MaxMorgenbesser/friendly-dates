import { connectionstr } from "./credentials.js";
import { MongoClient } from "mongodb";


export function DbConnect(){
        const client = new MongoClient(connectionstr);
        const db = client.db("friendlydates");
        const collection = db.collection("users");
        return collection; 
}