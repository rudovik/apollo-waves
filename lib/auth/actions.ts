"use server"
import { signIn, signOut } from "./nextAuth"

export async function signInUser(providerId) {
  return await signIn(providerId)
}

export async function signOutUser() {
  return await signOut()
}
