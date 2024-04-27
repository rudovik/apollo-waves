import { auth } from "lib/auth/nextAuth"
import { redirect } from "next/navigation"
// import { ProfileForm } from "./ProfileForm"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{JSON.stringify(session.user)}</h2>
    </>
  )
}
