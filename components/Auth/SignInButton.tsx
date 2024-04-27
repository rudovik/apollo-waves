"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function SignInButton({ session }) {
  if (session) {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? "/mememan.webp"}
          width={32}
          height={32}
          alt="Your Name"
        />
      </Link>
    )
  }

  return <button onClick={() => signIn()}>SignIn</button>
  // return <Link href={"/signin"}>Sign In</Link>
}
