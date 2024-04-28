// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

declare global {
  var authMongoDb: {
    promise: Promise<MongoClient>
  }
}

let cached = global.authMongoDb

if (!cached) {
  cached = global.authMongoDb = { promise: null }
}

if (!process.env.MONGODB_NEXTAUTH_URI) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGODB_NEXTAUTH_URI"'
  )
}

const uri = process.env.MONGODB_NEXTAUTH_URI

const getMongoDbPromise = (function () {
  let promise: Promise<MongoClient>

  function initialize(): Promise<MongoClient> {
    const promise = new MongoClient(uri).connect()
    return promise
  }

  return () => {
    const retPromise = promise || cached.promise
    if (retPromise) {
      return retPromise
    }
    if (!retPromise) {
      cached.promise = promise = initialize()
      console.log(" \x1b[32m\u2705\x1b[0m Auth.js db promise is created")
      return promise
    }
  }
})()

export default getMongoDbPromise
