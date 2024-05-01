import mongoose from "mongoose"
import type { Mongoose } from "mongoose"

// declare global {
//   var mongoose: {
//     conn: Mongoose
//     promise: Promise<Mongoose>
//   }
// }

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const mongooseSingleton = (function () {
  let promise: Promise<Mongoose>
  let conn: Mongoose

  async function initialize() {
    // console.log("Mongoose connection is initializing...")
    const promise = mongoose.connect(MONGODB_URI)
    return promise
  }

  return async () => {
    const retConn = conn || cached.conn
    const retPromise = promise || cached.promise
    if (retConn) {
      return retConn
    }
    if (retPromise) {
      return retPromise
    }
    if (!retConn && !retPromise) {
      cached.promise = promise = initialize()
      cached.conn = conn = await promise
      promise = cached.promise = null
      console.log(" \x1b[32m\u2705\x1b[0m Mongoose connected to DB")
      return conn
    }
  }
})()

export default mongooseSingleton
