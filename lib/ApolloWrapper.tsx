"use client"
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client"
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"

// have a function to create a client for you
function makeClient({ host, cookie }) {
  let httpLink: HttpLink
  const serverEnv = typeof window === "undefined"
  const devMode = process.env.NODE_ENV === "development"
  if (serverEnv) {
    let prefix = process.env.NODE_ENV === "production" ? "https://" : "http://"
    if (host.startsWith("localhost:")) {
      prefix = "http://"
    }
    httpLink = new HttpLink({
      uri: prefix + host + "/api/graphql",
      headers: { Cookie: cookie },
    })
  } else {
    httpLink = new HttpLink({
      uri: "/api/graphql",
    })
  }

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProductsToShop: {
              // read(
              //   existing,
              //   { args: { skip = 0, limit = existing?.products.length } = {} }
              // ) {
              //   if (!existing) return existing
              //   // skip = 0
              //   // limit = existing.products.length
              //   const { products, size, total } = existing
              //   // console.log("skip =" + skip)
              //   // console.log("limit = " + limit)
              //   return {
              //     products: products.slice(skip, skip + limit),
              //     size,
              //     total,
              //   }
              // },
              keyArgs: ["filters"],
              merge(existing, incoming, { args: { skip = 0 } }) {
                const mergedProducts = existing
                  ? existing.products.slice(0)
                  : []
                const existingSize = existing ? existing.size : 0

                const { products, size, total } = incoming
                for (let i = 0; i < products.length; i++) {
                  mergedProducts[skip + i] = products[i]
                }

                return {
                  products: mergedProducts,
                  size: size + existingSize,
                  total,
                }
              },
            },
          },
        },
      },
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

// you need to create a component to wrap your app in
export function ApolloWrapper({
  children,
  host,
  cookie,
}: {
  children: React.ReactNode
  host: string
  cookie: string
}) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient({ host, cookie })}>
      {children}
    </ApolloNextAppProvider>
  )
}
