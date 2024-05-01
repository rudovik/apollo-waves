"use client"
import { useTransition } from "react"

import { signOut } from "lib/auth/actions"

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    startTransition(async () => {
      await signOut()
    })
  }

  return (
    <button
      type="submit"
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        fontFamily: "inherit",
        textTransform: "inherit",
        cursor: "pointer",
        marginRight: "2rem",
      }}
      onClick={() => handleClick()}
      disabled={isPending}
    >
      <span>Log Out</span>
    </button>
  )
}
