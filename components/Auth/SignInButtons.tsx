"use client"

import { useTransition } from "react"
import { signInUser } from "lib/auth/actions"

export default function SignInButtons({ providerMap }) {
  const [isPending, startTransition] = useTransition()

  function handleClick(providerId: string) {
    startTransition(() => {
      signInUser(providerId)
    })
  }

  return (
    <div>
      {providerMap.map((provider, i) => (
        <button
          onClick={() => handleClick(provider.id)}
          key={i}
          disabled={isPending}
        >
          Sign In with {provider.name}
        </button>
      ))}
    </div>
  )
}
