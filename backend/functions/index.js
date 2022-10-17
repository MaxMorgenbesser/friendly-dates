// const functions = require("firebase-functions");
import functions from "firebase-functions"
import  express, { json } from "express"
import cors from "cors"
import { verifynum } from "./src/services.js"

const app = express()
app.use(cors())
app.use(json())


app.post("/users/verifynum", verifynum)

export const api = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
