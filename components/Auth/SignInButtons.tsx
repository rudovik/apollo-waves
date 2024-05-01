"use client"

import { useTransition } from "react"
import { signIn } from "lib/auth/actions"

export default function SignInButtons({ providerMap }) {
  const [isPending, startTransition] = useTransition()

  async function handleClick(providerId: string) {
    console.log(providerId)
    startTransition(async () => {
      await signIn(providerId)
    })
  }

  return (
    <div className="signInButtons">
      {providerMap.map((provider, i) => (
        <div className="signInButtons__container" key={provider.name}>
          <input
            type="checkbox"
            className="signInButtons__checkbox"
            id={provider.id}
          />
          <button
            onClick={handleClick.bind(null, provider.id)}
            key={i}
            disabled={isPending}
            className="signInButtons__button"
          >
            <label htmlFor={provider.id} className="signInButtons__label">
              <svg
                className={`signInButtons__icon signInButtons__icon--${provider.id}`}
              >
                <use xlinkHref={`/sprite.svg#icon-${provider.id}`}></use>
              </svg>
              Sign In with {provider.name}
            </label>
          </button>
        </div>
      ))}
    </div>
  )
}
