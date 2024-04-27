import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { ObjectId } from "mongodb"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { NextRequest } from "next/server"
import { ObjectIdScalar } from "types/scalars/ObjectIdScalar"
import { TypegooseMiddleware } from "middlewares/typegoose"

import { WoodResolver } from "resolvers/WoodResolver"
import { ProductResolver } from "resolvers/ProductResolver"

import { RequestContext } from "types/requests/RequestContext"
import { BrandResolver } from "resolvers/BrandResolver"

import { CartResolver } from "resolvers/CartResolver"
import { PaymentResolver } from "resolvers/PaymentResolver"

type HandlerType = {
  <HandlerReq extends NextApiRequest>(
    req: HandlerReq,
    res: NextApiResponse
  ): Promise<unknown>
  <HandlerReq_1 extends Request | NextRequest>(
    req: HandlerReq_1,
    res?: undefined
  ): Promise<Response>
}

declare global {
  var graphql: {
    promise: Promise<HandlerType>
    handler: HandlerType
  }
}

let cached = global.graphql

if (!cached) {
  cached = global.graphql = {
    promise: null,
    handler: null,
  }
}

const apolloSingleton = (function () {
  let promise: Promise<HandlerType>
  let handler: HandlerType

  async function initialize(): Promise<HandlerType> {
    let p: string = path.resolve(__dirname, "schema.gql")
    p = p.split(".next")[0] + "lib" + path.sep + "schema.graphqls"

    const schema = await buildSchema({
      resolvers: [
        WoodResolver,
        ProductResolver,
        BrandResolver,
        CartResolver,
        PaymentResolver,
      ],
      emitSchemaFile: process.env.NODE_ENV === "production" ? false : p,
      globalMiddlewares: [TypegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: true,
    })

    const server = new ApolloServer<RequestContext>({
      schema,
      introspection: process.env.NODE_ENV === "development" ? true : false,
    })

    const handlerPromise = startServerAndCreateNextHandler<
      NextRequest,
      RequestContext
    >(server, {
      context: async (req) => {
        return {
          req,
        }
      },
    })

    return handlerPromise
  }

  return async () => {
    const retHandler = handler || cached.handler
    const retPromise = promise || cached.promise
    if (retHandler) {
      return retHandler
    }
    if (retPromise) {
      return retPromise
    }
    if (!retHandler && !retPromise) {
      cached.promise = promise = initialize()
      handler = cached.handler = await promise
      promise = cached.promise = null
      console.log(" \x1b[32m\u2705\x1b[0m Apollo server initialized")
      return handler
    }
  }
})()

export default apolloSingleton
