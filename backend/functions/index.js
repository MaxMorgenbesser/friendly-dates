// const functions = require("firebase-functions");
import functions from "firebase-functions"
import  express, { json } from "express"
import cors from "cors"
import { adduserinfo, verifynum } from "./src/services.js"
import { middleware } from "./src/middleware.js"

const app = express()
app.use(cors())
app.use(json())

// login and add user info if user info is not available
app.post("/users/verifynum", verifynum)
app.put("/users/adduserinfo/:uid", middleware, adduserinfo)





export const api = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
