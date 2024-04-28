import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "./_authDb"
import getMongoDbPromise from "./authDB"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

export const config = {
  adapter: MongoDBAdapter(getMongoDbPromise()),
  providers: [
    GitHub({
      profile(profile) {
        // console.log(profile)
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        }
      },
    }),
    Google({
      profile(profile) {
        // console.log(profile)
        return {
          id: profile.sub.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.picture,
          role: "user",
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      session.user.id = user.id
      // console.log(user)
      return session
    },
  },
  trustHost: true,
} satisfies NextAuthConfig

const providers = config.providers as Provider[]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth(config)
