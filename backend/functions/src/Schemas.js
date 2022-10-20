import mongoose from 'mongoose'

export const messageSchema = new mongoose.Schema({
    message: String,
    sentByUid: String,
    receivedByUid: String
})