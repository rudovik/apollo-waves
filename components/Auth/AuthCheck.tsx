import type { Session } from "next-auth"

export default async function AuthCheck({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  if (session) {
    return <>{children}</>
  }

  return null
}
