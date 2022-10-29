// const functions = require("firebase-functions");
import functions from "firebase-functions"
import  express, { json } from "express"
import cors from "cors"
import { adduserinfo, getmatches, likeOrDislike, userProfile, verifynum, verifyPin } from "./src/services.js"
import { middleware } from "./src/middleware.js"
import { addMessage } from "./src/messages.js"

const app = express()
app.use(cors())
app.use(json())

// login and add user info if user info is not available
app.post("/users/verifynum", verifynum)
app.put("/users/adduserinfo/:uid", middleware, adduserinfo)
app.put("/users/updateuser/:uid", middleware, userProfile)
app.post('/users/verifypin/:uid', middleware,verifyPin)
app.post('/messages/add',  middleware,addMessage)
app.put('/connect/likeordislike/:uid',middleware, likeOrDislike)
app.get('/connect/matches/:uid', getmatches)

export const api = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//