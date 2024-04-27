import { auth, providerMap } from "lib/auth/nextAuth"
import { redirect } from "next/navigation"
import SignInButtons from "components/Auth/SignInButtons"

export default async function SignInPage() {
  const session = await auth()
  if (session) return redirect("/")

  return <SignInButtons providerMap={Object.values(providerMap)} />
}
