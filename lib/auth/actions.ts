"use server"

import { signIn as signInUser, signOut as signOutUser } from "./nextAuth"

export async function signIn(providerId: string) {
  return await signInUser(providerId)
}

export async function signOut() {
  return await signOutUser()
}
