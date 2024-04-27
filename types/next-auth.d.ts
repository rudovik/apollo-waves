import { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: { role: string } & DefaultSession["user"]
  }
  interface User {
    role: string
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    role: string
  }
}
